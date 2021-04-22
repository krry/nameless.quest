# Going Passwordless

## How to provide passwordless login in a Vue 3 app with Firebase Auth, allowing guests to sign up and sign in with a magic email link or a secret code texted to their mobile

I am very pleased to see Cotter and Magic Link gaining traction. But their business models have repelled me. Clearly they have accepted VC money and are now in a hurry to convert those they might serve into revenue sources. We'll be going around them, tapping the vibrant open source community around passwordless authentication, and sharing our journey that you dear devsigner might walk this path without a machete.

Even still Firebase had a considerable head-start, and as I weigh the pros and cons and cost, Firebase becomes the easy choice, especially because using their auth gets me halfway to a datastore as well.

But alas, woe is me for it doesn't yet work as I had hoped. Here's what is happening:

When a user logs in with an email, a link appears in their inbox. That link auths with Firebase then continues them to /journal. Only it seems that the route guard redirects them to /login instead, which means the guard is not finding a cached.uid or a FirebaseUser.

[leverage this](https://github.com/gedrick/vue-node-passport)
[read this](https://medium.com/@ninjudd/passwords-are-obsolete-9ed56d483eb)
[consider this](https://github.com/florianheinemann/passwordless)
[compare this](https://github.com/mxstbr/passport-magic-login)
