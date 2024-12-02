---
Link: https://www.youtube.com/watch?v=5QP0mvrJkiY
Title: All 29 Next.js Mistakes Beginners Make
---
#1: "use client" too high
#2: Not refactoring for "use client"
#3: Thinking a component is a server component because it does not have "use client"
#4: Thinking that a server component becomes a client component if you wrap it inside a client component
#5: Using state management (Context API, Zustand, Redux) in server components 
#6: Using ‘use server’ to create a server component
#7: Accidentally leaking sensitive data from server to client
#8: Thinking that client components only run in the client
#9: Using browser API’s (e.g. localStorage) incorrectly
        dynamic() from next.js package to define ssr or ssg behaviours
#10: Getting hydration errors
#11: Incorrectly dealing with third-party components
#12: Using route handlers for getting data
        Cache with fetch by default(run once if repeat in the same render path)
        Nextjs data cache which persists across deployments
        ORM like Prisma does not cache by default, use react's cache fxn to deduplicate
            or use unstable_cache from next/cache to persist on server
#13: Thinking it’s a problem to get the same data in different places
        Cached, so no problem ???
#14: Getting a ‘waterfall’ effect when fetching data
        No waterfall should be used if data is independent and non-sequential
        Promise.all, Promise.allSettled (works even if 1 promise in array rejects)
#15: Submitting data to server component or route handler
        Specify Nextjs action attribute and include a function to run
        "use server" for making function into a server action
        Progressive enhancement - Server actions works w/o JS enabled
            UseFormStatus - pending status
            UseFormState - err state
            UseOptimistic - optimistic handling
#16: Getting confused when the page doesn’t reflect data mutation
        revalidatePath on specific path in next/cache at end of actions
#17: Thinking that server actions can only be used in server components
#18: Forgetting to validate & protect server actions
#19: Adding ‘use server’ to make sure something stays on the server
        "server-only" is more appropriate because "use server" exposes the endpoint ("use server" creates action)
#20: Misunderstanding dynamic routes (params & searchParams)
#21: Incorrectly working with searchParams
        searchParams is available to use on server side, will make roundtrip network request to work on server component
        useSearchParams for client side hook
#22: Forgetting to deal with loading state
#23: Not being granular with Suspense
#24: Adding Suspense in the wrong place
#25: Forgetting ‘key’ prop for Suspense
#26: Accidentally opting a page out of static rendering
#27: Hardcoding secrets
#28: Not making a distinction between client and server utils
#29: Using redirect() in try / catch

