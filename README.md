# Relewise Candidate Assignment

## Prerequisites

- **Node** >= 20.19.0 
> (Required by [Vue](https://vuejs.org/guide/quick-start.html) and [Vite](https://vite.dev/guide))

## Run Server and Client

### CORS Handling in Dev vs Production

- In dev environment, CORS is handled by [Vite proxy](https://vite.dev/config/server-options). 
- In production environment, CORS is handled by [Fastify CORS](https://github.com/fastify/fastify-cors). 

### Development

```bash
# Start backend dev server on http://localhost:3000
cd server
npm install
npm run dev
    
# Start frontend dev server on http://localhost:5173
cd ../client
npm install
npm run dev
```

Search something and navigate to product detail page, observe the request URLs in network tab:
- `http://localhost:5173/api/search`
- `http://localhost:5173/api/track-product-view`
- **_→ forwarded by Vite proxy_** in **[client/vite.config.ts](client/vite.config.ts)**

### Production

```bash
# Start backend prod server on http://localhost:3000
cd server
npm install
npm run build
npm run start
    
# Start frontend prod server on http://localhost:4173
cd ../client
npm install
npm run build
npm run preview
```

Search something and navigate to product detail page, observe the request URLs in network tab:
- `http://localhost:3000/search`
- `http://localhost:3000/track-product-view`
- **_→ handled by Fastify CORS_** in **[server/src/index.ts](server/src/index.ts)**

> For production, since I only whitelisted `http://localhost:4173` for CORS, please use port `4173` for the frontend production build. Otherwise, you can of course whitelist **`*`** in [server/src/constants.ts](server/src/constants.ts) and then use any other ports.

## Requirements Checklist

### Server

#### 1. `/track-product-view` endpoint
   
- ##### A. 200 Response
   
   <details>
   <summary>Case 1: valid productId with string userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "productId": "product1"
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: valid productId with null userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": null },
       "productId": "product1"
     }'
   ```
   </details>

   <details>
   <summary>Case 3: valid productId with null user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": null,
       "productId": "product1"
     }'
   ```
   </details>

   <details>
   <summary>Case 4: valid productId with undefined user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "productId": "product1"
     }'
   ```
   </details>
   
- ##### B. 400 Response
   
   <details>
   <summary>Case 1: missing productId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: empty productId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "productId": ""
     }'
   ```
   </details>
   
   <details>
   <summary>Case 3: invalid user object structure</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/track-product-view \
     -H "Content-Type: application/json" \
     -d '{
       "user": "some string",
       "productId": "product1"
     }'
   ```
   </details>
   
   > **400 requests are handled by Fastify schema in [server/src/schemas/trackProductView.ts](server/src/schemas/trackProductView.ts)**

#### 2. `/search` endpoint
   
- ##### A. 200 Response
   
   <details>
   <summary>Case 1: valid search input with valid userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "term": "tea",
         "languageCode": "en"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: valid search input with null userId</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": null },
       "search": {
         "term": "beer",
         "languageCode": "en"
       }
     }'
   ```
   </details>

   <details>
   <summary>Case 3: valid search input with null user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": null,
       "search": {
         "term": "wine",
         "languageCode": "en"
       }
     }'
   ```
   </details>

   <details>
   <summary>Case 4: valid search input with undefined user</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "search": {
         "term": "wine",
         "languageCode": "en"
       }
     }'
   ```
   </details>

- ##### B. 400 Response
   
   <details>
   <summary>Case 1: missing required search.term</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "languageCode": "en"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 2: missing required search.languageCode</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" },
       "search": {
         "term": "tea"
       }
     }'
   ```
   </details>
   
   <details>
   <summary>Case 3: missing search object</summary>
   
   ```bash
   curl -i -X POST http://localhost:3000/search \
     -H "Content-Type: application/json" \
     -d '{
       "user": { "id": "user1" }
     }'
   ```
   </details>

   > **400 requests are handled by Fastify schema in [server/src/schemas/search.ts](server/src/schemas/search.ts)**

### Client

#### 1. User ID management 

- Navigate to any page, open browser DevTools → Application → Local Storage
- Observe that a unique `userId` is automatically generated and persisted across browser sessions (displayed in header as well)

#### 2. Homepage
- Start typing in the search input (e.g., "tea", "wine", "beer") 
- Open browser DevTools → Network tab and observe that the `/search` API endpoint is called with debounced query
- The request payload contains `userId` which was generated previously

#### 3. PDP page
- Click on a product from the search results to navigate to the product detail page
- Open browser DevTools → Network tab and observe that the `/track-product-view` api endpoint is automatically called with the productId and userId. 
- Check the browser console log: `Product view tracked: ...`
  
### Other Requirements/Features
- **Testing**
    > unit and api tests for backend, unit tests and (very basic) e2e tests for frontend
- **CI workflow**
    > automated build and tests for both client and server applications on every PR
- **Loading state**
    > throttle network requests in browser DevTools to observe loading state 
- **Debounced search**
- **Basic error handling** (for demo purpose)
- **TypeScript strict mode**

## Limitations

### Server 
- No API environment configuration
- No API key management 
- No API client configuration
- No caching 
- No rate limiting 
- No proper cors configuration 

### Client 

- SEO considerations
  > Do we need SEO for PDP page? SPA with Vue might impact SEO (SSR vs CSR)
- No API proxy routes in production
  > Frontend makes direct API calls, exposing backend endpoints and requiring CORS configuration
- No productId validation for PDP 
- No error boundary component 

## Scripts 

### Server
```bash
cd server
npm run dev
npm run build
npm run start
npm run test
```

### Client
```bash
cd client
npm run dev
npm run build
npm run preview
npm run test:unit
npm run test:e2e
```
