## Car Dealer CMS

## 📚 What New Things I Learned:

### => HTML Sanitization

The project uses `sanitize-html` to ensure secure rendering of HTML content. This library helps prevent XSS (Cross-Site Scripting) attacks by cleaning and sanitizing HTML input before rendering it in the application. It removes potentially dangerous HTML tags and attributes while preserving safe content.

### => @upstash/ratelimit and @upstash/redis

The [@upstash/ratelimit and @upstash/redis](src/lib/radis_store.ts) packages are commonly used together for rate limiting in serverless.
Their use case is:

- Enforce API rate limits (e.g., 10 requests per minute per user)
- Prevent abuse of your APIs.

### => NUQS

[NUQS](src/components/shared/SearchInput.tsx) is a type-safe search params state manager for React frameworks. Like useState, but stored in the URL query string.

### => Debounce

It [debounces](src/components/shared/SearchInput.tsx) the search input, which means it will wait for a second before executing the function passed to it. This is useful for preventing too many requests being sent to the server when the user is typing in the search input.

### => useActionState

The [useActionState](src/actions/subscribe.ts) introduction of Server Actions in Next.js 13+ (App Router), the useActionState hook is used to manage the state of a Server Action on the client. It helps you handle:

-Form submissions
-Loading state
-Server responses
-Error handling

### => Swiper

[Swiper](src/components/classified/ClassifiedView.tsx) is the most modern free and open source mobile touch slider with hardware accelerated transitions and amazing native behavior. Use it on websites, web apps, and mobile native/hybrid apps.

### => fslightbox-react

[fslightbox-react](src/components/classified/ClassifiedView.tsx) An easy to use but powerful plug-in for displaying various types of sources—such as images, HTML videos, or YouTube videos—in a clean overlying box. Supports, among others, captions, thumbnails, and zooming.
Present a single source or create a beautiful gallery with a stylish lightbox without jQuery.

### => react-tooltip

[react-tooltip](src/components/classified/ActionButtons.tsx) A react tooltip is a floating react element that displays information related to an anchor element when it receives keyboard focus or the mouse hovers over it.
