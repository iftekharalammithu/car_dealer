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
