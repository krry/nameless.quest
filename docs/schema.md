# Schema

Seeing as we're using Firebase for storage, or a realtime database as they term it, we ought to arrange our data accordingly. Let's see what we have here.

```ts
type Lot = number;

interface Roll {
	moment: Date;
	query: string;
	toss: Lot[];
	notes: string;
}

interface Guest {
	uid: string;
	email: string;
	phone: string;
	displayName: string;
	rolls: Roll[];
}
```
