# Supabase Setup & Firebase Migration Guide

**Nameless Quest** — Migrating from Firebase to Supabase for journal persistence, authentication, and real-time sync.

---

## 🎯 Executive Summary

This guide walks you through:

1. Creating a Supabase project
2. Designing the `rolls` (journal entries) schema
3. Setting up email-based authentication (Magic Links or OTP)
4. Implementing real-time subscriptions for journal changes
5. Migrating code from Firebase to Supabase
6. Testing and deploying

**Why Supabase?**

- Free tier covers our low-traffic use case (500 MB DB, 100k MAU, 2 GB/mo egress)
- PostgreSQL + PostgREST API is more powerful than Firestore
- Row Level Security (RLS) provides database-level authorization
- Real-time capabilities out of the box
- Simpler to manage than Firebase for a single-user journal app

---

## 📋 Prerequisites

- **Node.js** 16+ (check with `node --version`)
- **npm** or **pnpm** (we're using pnpm in Nameless)
- A **GitHub account** (for OAuth, optional)
- **Git** for version control

---

## Phase 1: Supabase Project Setup

### 1.1 Create a Supabase Account & Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** and sign up (email or GitHub)
3. In the dashboard, click **"New Project"**
4. Fill in:
   - **Project Name:** `nameless-quest` (or similar)
   - **Database Password:** Generate a strong one (save it securely!)
   - **Region:** Choose nearest to you (e.g., `us-east-1` for North America)
5. Click **"Create new project"** (takes 1–2 minutes)

### 1.2 Get Your Connection Credentials

Once the project is ready:

1. Go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxxx.supabase.co`)
   - **Anon Key** (safe for client-side, public)
   - **Service Role Key** (secret, for backend only)
3. Save these—you'll need them in `.env.local`

### 1.3 Configure Redirect URLs for Auth

1. Go to **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add:
   - `http://localhost:2022` (dev)
   - `http://localhost:2021` (preview)
   - `https://yourdomain.com` (production)
3. Click **Save**

---

## Phase 2: Database Schema Design

### 2.1 Understanding the Data Model

Nameless Quest stores **journal entries called "rolls"**. Each roll captures one I Ching divination:

```typescript
interface Roll {
	id: string; // Unique UUID (primary key)
	user_id: uuid; // References auth.users(id)
	query: string; // The question asked
	toss: string; // The hexagram result (e.g., "䷆")
	moment: timestamptz; // When the roll was created
	notes?: string; // Optional reflection/notes
	created_at: timestamptz; // Auto timestamp
	updated_at: timestamptz; // Auto timestamp
}
```

**Key differences from Firebase:**

- Firebase used `users/{uid}/rolls/{rollId}` hierarchy
- Supabase uses `rolls` table with `user_id` foreign key (relational)
- Timestamps are native PostgreSQL `timestamptz` (not custom objects)

### 2.2 Create the Rolls Table

Open **Supabase Dashboard** → **SQL Editor** and run:

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create rolls table
create table public.rolls (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  query text not null,
  toss text not null,
  notes text,
  moment timestamptz not null default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Index for faster queries
  constraint fk_rolls_user foreign key (user_id) references auth.users(id)
);

-- Create index for faster user lookups
create index rolls_user_id_idx on public.rolls(user_id);
create index rolls_created_at_idx on public.rolls(created_at desc);

-- Enable RLS
alter table public.rolls enable row level security;

-- RLS Policy: Users can only see/edit their own rolls
create policy "Users can view their own rolls"
  on public.rolls for select
  to authenticated
  using ( (select auth.uid()) = user_id );

create policy "Users can insert their own rolls"
  on public.rolls for insert
  to authenticated
  with check ( (select auth.uid()) = user_id );

create policy "Users can update their own rolls"
  on public.rolls for update
  to authenticated
  using ( (select auth.uid()) = user_id )
  with check ( (select auth.uid()) = user_id );

create policy "Users can delete their own rolls"
  on public.rolls for delete
  to authenticated
  using ( (select auth.uid()) = user_id );

-- Optional: Allow service role (admin) to bypass RLS
-- This is handled automatically; service_role key bypasses RLS
```

**Verify it worked:**

- Go to **Table Editor** in Supabase Dashboard
- You should see the `rolls` table with all columns
- RLS policies should be listed in the **Access Control** tab

---

## Phase 3: Authentication Setup

Nameless Quest can use **one of two passwordless approaches**:

### Option A: Magic Links (Recommended)

Users click an email link to log in instantly—no password needed.

#### Setup Magic Links in Dashboard

1. Go to **Authentication** → **Providers** → **Email**
2. Under **Email Auth**, ensure:
   - ✅ **Enable Email Provider** is ON
   - ✅ **Confirm email** is ON (or OFF if you want auto-signup)
3. Under **Email Templates**, customize (optional):
   - Confirm signup email
   - Magic link email
   - Password reset email
4. Click **Save**

#### Email Templates (Optional Customization)

In **Authentication** → **Email Templates**, you can edit the Magic Link template.

**Default template** sends a clickable link. If using PKCE flow, edit to:

```html
<h2>Magic Link</h2>
<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Log In</a></p>
```

### Option B: One-Time Password (OTP)

Users receive a 6-digit code they enter on your app—good for apps that can't handle email clicks.

#### Setup OTP in Dashboard

1. Go to **Authentication** → **Email Templates**
2. Edit the **Confirm signup** template to include the token:

```html
<h2>Your One-Time Code</h2>
<p>Enter this code to sign in: {{ .Token }}</p>
```

3. Save

**In your code**, you'd ask the user for their email, send them an OTP, and verify:

```typescript
// Step 1: Send OTP to email
await supabase.auth.signInWithOtp({
	email: 'user@example.com',
	options: {
		shouldCreateUser: true,
	},
});

// Step 2: User enters code, you verify
const { data, error } = await supabase.auth.verifyOtp({
	email: 'user@example.com',
	token: '123456', // 6-digit code
	type: 'email',
});
```

---

## Phase 4: Environment Variables

Create a **`.env.local`** file in the project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional: For admin operations (backend only, never expose to client)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Why `VITE_` prefix?** Because this is a Vite project, the prefix tells Vite to expose these variables to the client.

**Security note:**

- The `ANON_KEY` is _public_ (safe in `.env.local`)
- The `SERVICE_ROLE_KEY` is _secret_ (for backend only—don't commit!)
- Row Level Security in the database protects your data even with the anon key exposed

---

## Phase 5: Code Migration

### 5.1 Install Supabase Client

```bash
npm install @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### 5.2 Replace `src/firebase.ts`

**Old (Firebase):**

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	/* ... */
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth, firebaseApp };
```

**New (Supabase):**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to get the current user
export async function getAuthUser() {
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

// Export a function to sign out
export async function signOut() {
	const { error } = await supabase.auth.signOut();
	return error;
}
```

### 5.3 Update `src/store/rolls.ts`

**The key changes:**

- Replace Firebase functions with Supabase equivalents
- Change data structure (no more `users/{uid}/rolls`, just `rolls` table with `user_id`)
- Timestamps are now native PostgreSQL timestamps (simpler!)

**New version:**

```typescript
import { ref } from 'vue';
import { cfg } from '../store';
import { supabase, getAuthUser } from '../firebase';
import { Roll } from '../schema';

export const cachedRoll = ref<Roll | null>();
export const activeRolls = ref<Roll[]>([]);

// CREATE
export async function addRoll(roll: Omit<Roll, 'id' | 'user_id' | 'created_at'>): Promise<void> {
	console.log('roll to save', roll);

	// Avoid duplicates
	const queryIndex = activeRolls.value.map(r => r.query).indexOf(roll.query);
	const tossIndex = activeRolls.value.map(r => r.toss).indexOf(roll.toss);
	if (queryIndex !== -1 && queryIndex === tossIndex) {
		console.log('Duplicate roll detected, skipping');
		return;
	}

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { data, error } = await supabase
		.from('rolls')
		.insert({
			...roll,
			user_id: user.id,
		})
		.select();

	if (error) {
		console.error('Error adding roll:', error);
	} else {
		console.log('added roll', data);
	}
	cfg.loading = false;
}

// READ
export async function getRolls(): Promise<void> {
	console.log('getting rolls');

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { data, error } = await supabase
		.from('rolls')
		.select('*')
		.eq('user_id', user.id)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching rolls:', error);
	} else {
		console.log('got rolls', data);
		activeRolls.value = (data || []) as Roll[];
	}
	cfg.loading = false;
}

// UPDATE
export async function updateRoll(roll: Roll): Promise<void> {
	if (!roll.id) {
		console.error('no roll id');
		return;
	}

	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { error } = await supabase
		.from('rolls')
		.update({ notes: roll.notes })
		.eq('id', roll.id)
		.eq('user_id', user.id);

	if (error) {
		console.error('Error updating roll:', error);
	} else {
		console.log('updated roll', roll.id);
	}
	cfg.loading = false;
}

// DELETE
export async function deleteRoll(docId: string): Promise<void> {
	const user = await getAuthUser();
	if (!user) {
		console.error('No authenticated user');
		return;
	}

	cfg.loading = true;
	const { error } = await supabase.from('rolls').delete().eq('id', docId).eq('user_id', user.id);

	if (error) {
		console.error('Error deleting roll:', error);
	} else {
		console.log('deleted roll', docId);
		await getRolls(); // Refresh
	}
	cfg.loading = false;
}
```

### 5.4 Update Schema Types

Update `src/schema.ts` to match Supabase's native types:

```typescript
// ... existing code ...

export interface Roll {
	id: string; // UUID
	user_id: string; // UUID (Supabase auth user id)
	query: string;
	toss: string;
	notes?: string;
	moment: string; // ISO 8601 timestamp (instead of Firebase moment object)
	created_at?: string; // ISO 8601 timestamp
	updated_at?: string; // ISO 8601 timestamp
}

export const defRoll: Roll = {
	id: '',
	user_id: '',
	query: '',
	toss: '',
	moment: new Date().toISOString(),
	notes: '',
};

// ... rest of schema ...
```

### 5.5 Update `src/views/Journal.vue` (if needed)

If Journal.vue imports from firebase:

```typescript
// OLD
import { db, auth } from '../firebase';

// NEW
import { supabase, getAuthUser } from '../firebase';
```

And update any timestamp handling:

```typescript
// OLD: Firebase Firestore timestamp object
const roll = {
	moment: {
		seconds: Date.now() / 1000,
		nanoseconds: Date.now(),
	},
};

// NEW: ISO 8601 string
const roll = {
	moment: new Date().toISOString(),
};
```

---

## Phase 6: Real-Time Sync (Optional)

To listen for real-time changes to rolls, use Supabase Realtime:

```typescript
// In src/store/rolls.ts or a composable

export function subscribeToRolls(userId: string, callback: (rolls: Roll[]) => void) {
	const subscription = supabase
		.channel(`rolls:${userId}`)
		.on(
			'postgres_changes',
			{
				event: '*', // Listen to INSERT, UPDATE, DELETE
				schema: 'public',
				table: 'rolls',
				filter: `user_id=eq.${userId}`,
			},
			payload => {
				console.log('Real-time update:', payload);
				getRolls(); // Fetch fresh data
			}
		)
		.subscribe();

	return subscription;
}

// Usage in a Vue component:
import { onMounted, onUnmounted } from 'vue';
import { subscribeToRolls } from '../store/rolls';

export default {
	setup() {
		let subscription: any = null;

		onMounted(async () => {
			const user = await getAuthUser();
			if (user) {
				subscription = subscribeToRolls(user.id, () => {
					// Rolls updated
				});
			}
		});

		onUnmounted(() => {
			if (subscription) {
				supabase.removeChannel(subscription);
			}
		});
	},
};
```

---

## Phase 7: Authentication Flow in UI

### 7.1 Magic Link Sign-In

```typescript
// src/components/AuthForm.vue or similar

import { supabase } from '../firebase';

async function handleMagicLinkSignIn(email: string) {
	const { error } = await supabase.auth.signInWithOtp({
		email,
		options: {
			emailRedirectTo: window.location.origin,
			shouldCreateUser: true, // Auto-create users
		},
	});

	if (error) {
		console.error('Error sending magic link:', error);
	} else {
		alert('Check your email for a login link!');
	}
}
```

### 7.2 Handle Auth State Change

```typescript
// In src/main.ts or your app's setup

import { supabase, getAuthUser } from './firebase';
import { cached } from './store/cache';

supabase.auth.onAuthStateChange(async (event, session) => {
	console.log('Auth state changed:', event);

	if (event === 'SIGNED_IN' && session) {
		cached.uid = session.user.id;
		cached.email = session.user.email;
		// Load rolls
		getRolls();
	} else if (event === 'SIGNED_OUT') {
		cached.uid = '';
		cached.email = '';
		activeRolls.value = [];
	}
});
```

---

## Phase 8: Migration Checklist

### Data Migration (if you have existing Firebase data)

If you already have rolls in Firebase, you'll need to migrate them:

1. **Export Firebase data:**

   ```bash
   # Use Firebase console or a script to export rolls as JSON
   ```

2. **Transform & import to Supabase:**

   ```typescript
   // Script: migrate-rolls.ts
   import { supabase } from './firebase';
   import * as fs from 'fs';

   async function migrateRolls() {
   	const rolls = JSON.parse(fs.readFileSync('rolls.json', 'utf8'));

   	for (const roll of rolls) {
   		const { error } = await supabase.from('rolls').insert({
   			id: roll.id, // Or let Supabase generate new IDs
   			user_id: roll.uid, // Map Firebase uid to Supabase user_id
   			query: roll.query,
   			toss: roll.toss,
   			notes: roll.notes || '',
   			moment: new Date(roll.moment.seconds * 1000).toISOString(),
   			created_at: new Date().toISOString(),
   		});

   		if (error) {
   			console.error('Error migrating roll:', error);
   		}
   	}

   	console.log('Migration complete!');
   }

   migrateRolls();
   ```

3. **Verify in Supabase:**
   - Go to **Table Editor**
   - Check the `rolls` table for your migrated data
   - Verify row counts

### Testing Checklist

- [ ] **Auth Flow**

  - [ ] User can sign up with email/magic link
  - [ ] User receives email with link
  - [ ] Clicking link logs them in
  - [ ] User session is stored (check localStorage for `sb-*` tokens)

- [ ] **CRUD Operations**

  - [ ] User can create a roll (add to journal)
  - [ ] Rolls appear in the list immediately
  - [ ] User can update a roll's notes
  - [ ] User can delete a roll
  - [ ] Roll disappears from list after delete

- [ ] **Data Security**

  - [ ] User A cannot see User B's rolls (RLS working)
  - [ ] User A cannot delete User B's rolls
  - [ ] Anon users cannot access rolls (RLS blocking)

- [ ] **Real-time Sync (if enabled)**

  - [ ] Multiple tabs/windows update in sync
  - [ ] Real-time updates work on mobile

- [ ] **Performance**

  - [ ] App loads in < 2 seconds (check Network tab)
  - [ ] Fetching 100+ rolls is fast
  - [ ] Creating/updating rolls is instant

- [ ] **Error Handling**
  - [ ] Network errors show user-friendly messages
  - [ ] Missing auth shows login screen
  - [ ] Invalid data is rejected gracefully

---

## Phase 9: Deployment

### Environment Variables

Add to your deployment platform (Netlify, Vercel, etc.):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Recommended Deployment Platforms

- **Netlify** (current) — set env vars in Build & Deploy → Environment
- **Vercel** — set in Settings → Environment Variables
- **GitHub Pages** — set in Settings → Environments (requires actions)

### Post-Deployment Checks

1. Add your production domain to **Authentication** → **URL Configuration**
2. Test live magic link flow
3. Monitor real-time in Supabase dashboard for errors
4. Set up email notifications for rate limits (optional)

---

## Phase 10: Maintenance & Monitoring

### Monitoring

1. **Supabase Dashboard**

   - Check **Logs** tab for errors
   - Monitor **Storage** usage (should be < 500 MB)
   - Watch **Auth** for suspicious activity

2. **Performance**
   - Query times shown in Supabase SQL Editor
   - Network tab in browser dev tools

### Backups

- Supabase automatically backs up your data
- Check **Settings** → **Backups** for retention policies
- Free tier: 7-day retention

### Database Maintenance

- Queries are automatically optimized by PostgreSQL
- RLS indexes are in place (fast lookups)
- No manual maintenance needed for small datasets

---

## Troubleshooting

### "Magic link email not received"

- Check spam folder
- Verify email in **Authentication** → **Users**
- Check rate limit (2 emails/hour on free tier default SMTP)
- Consider custom SMTP for production

### "Permission denied" when fetching rolls

- RLS policy not working → Check **Access Control** tab
- User not authenticated → Check `getAuthUser()` returns a user
- User ID mismatch → Verify `user_id` in rows matches session user

### "VITE_SUPABASE_URL is undefined"

- Ensure `.env.local` file exists
- Variables must start with `VITE_` (Vite convention)
- Restart dev server after creating `.env.local`

### Real-time not working

- Ensure table has RLS enabled
- Verify subscription filter is correct
- Check browser console for errors
- Rate limit: 100 connections per project (free tier)

### "Relation public.rolls does not exist"

- SQL script didn't run → Go to **SQL Editor**, paste it again, run
- Check **Table Editor** for the `rolls` table
- Verify no SQL syntax errors

---

## Reference

### Useful Links

- **Supabase Docs:** https://supabase.com/docs
- **JavaScript Client:** https://supabase.com/docs/reference/javascript
- **Auth Docs:** https://supabase.com/docs/guides/auth
- **Realtime Docs:** https://supabase.com/docs/guides/realtime
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security

### Supabase vs Firebase Quick Reference

| Feature        | Firebase                            | Supabase                  |
| -------------- | ----------------------------------- | ------------------------- |
| **Database**   | Firestore (NoSQL)                   | PostgreSQL (SQL)          |
| **Auth**       | Firebase Auth                       | Supabase Auth (same tech) |
| **Realtime**   | Firestore Listeners                 | Postgres Changes          |
| **RLS**        | ❌ No (security rules are separate) | ✅ Yes (native Postgres)  |
| **Free Tier**  | 1 GB storage                        | 500 MB storage            |
| **Free Users** | Unlimited                           | 100k MAU                  |
| **Scaling**    | Pay per operation                   | Pay per bandwidth         |

---

## Next Steps

1. **Create a Supabase project** (Phase 1)
2. **Set up schema & auth** (Phases 2–3)
3. **Migrate code** (Phase 5)
4. **Test locally** (Phase 8)
5. **Deploy** (Phase 9)

**Questions?** Check the troubleshooting section or Supabase docs.

---

**Written by Wesley 🧗** — Scout for the Nameless Quest constellation.  
_Last updated: Feb 2025_
