# 🚀 Deploying to Cloudflare Pages

This guide will walk you through deploying your Van Monitoring System to Cloudflare Pages.

## ⚠️ Important Note

**Cloudflare Pages is designed for static sites and serverless functions**. Since your application uses:
- Express.js backend with MongoDB
- File uploads with Multer
- WebSocket-like features

You have **two deployment options**:

---

## 🎯 Option 1: Hybrid Deployment (Recommended)

### Frontend → Cloudflare Pages
### Backend → Cloudflare Workers or external service (Render/Railway)

#### Step 1: Keep your backend on Render or Railway
Your current `render.yaml` is already configured. Keep using Render/Railway for the backend.

#### Step 2: Deploy Frontend to Cloudflare Pages

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Cloudflare deployment"
   git push origin main
   ```

2. **Login to Cloudflare Dashboard**:
   - Go to https://dash.cloudflare.com/
   - Navigate to **Pages** → **Create a project**

3. **Connect your GitHub repository**:
   - Click **Connect to Git**
   - Select your repository: `ISElec3_BSIS3B_Framework_NoSQL_Van-Monitoring`
   - Click **Begin setup**

4. **Configure build settings**:
   ```
   Project name: van-monitoring
   Production branch: main
   Framework preset: Vite
   Build command: cd frontend && npm install && npm run build
   Build output directory: frontend/dist
   Root directory: /
   ```

5. **Set Environment Variables** (in Cloudflare Pages dashboard):
   - Click **Settings** → **Environment variables**
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.onrender.com
     ```

6. **Update your frontend config**:
   - Edit `frontend/src/config.js` to use the environment variable

#### Step 3: Update Frontend Configuration

Update your API URL configuration to point to your backend server.

---

## 🎯 Option 2: Full Cloudflare Deployment with Workers

Convert your Express backend to Cloudflare Workers. This requires significant refactoring:
- Rewrite Express routes as Worker handlers
- Use Cloudflare D1 or external MongoDB
- Use Cloudflare R2 for file storage

**This option is complex and time-consuming.**

---

## ✅ Quick Start (Option 1 - Recommended)

### 1. Update Frontend Config

Your `frontend/src/config.js` needs to point to your backend API:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 
                import.meta.env.PROD 
                  ? 'https://your-backend.onrender.com'
                  : 'http://localhost:3000';

export default API_URL;
```

### 2. Deploy Backend First

1. Keep your backend on **Render** or deploy to **Railway**
2. Get your backend URL (e.g., `https://van-monitoring.onrender.com`)
3. Make sure environment variables are set:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### 3. Deploy Frontend to Cloudflare Pages

Follow the steps in Option 1 above.

### 4. Update CORS Settings

Update your backend `app.js` CORS configuration to allow your Cloudflare Pages domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://van-monitoring.pages.dev',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

---

## 🔧 Using Cloudflare CLI (Alternative)

### Install Wrangler CLI

```bash
npm install -g wrangler
```

### Login to Cloudflare

```bash
wrangler login
```

### Deploy

```bash
wrangler pages deploy frontend/dist --project-name=van-monitoring
```

---

## 📝 Environment Variables

Set these in your Cloudflare Pages dashboard:

### Frontend (Cloudflare Pages)
- `VITE_API_URL` - Your backend API URL

### Backend (Render/Railway)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `NODE_ENV` - Set to `production`
- `PORT` - Port number (usually auto-set)

---

## 🌐 Custom Domain

1. In Cloudflare Pages dashboard, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain name
4. Follow DNS configuration instructions

---

## 🔄 Automatic Deployments

Cloudflare Pages automatically deploys when you push to GitHub:
- **Main branch** → Production deployment
- **Other branches** → Preview deployments

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend CORS allows your Cloudflare Pages domain
- Check that API_URL in frontend points to correct backend

### API Connection Issues
- Verify `VITE_API_URL` is set in Cloudflare Pages
- Check backend is running and accessible
- Verify MongoDB connection in backend

### Build Failures
- Check build logs in Cloudflare Pages dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

---

## 📦 Build Configuration Summary

### Frontend Build
```json
{
  "build": {
    "command": "cd frontend && npm install && npm run build",
    "output": "frontend/dist"
  }
}
```

### Backend (Keep on Render/Railway)
- Uses existing `render.yaml` configuration
- Serves API endpoints only
- Handles database and file uploads

---

## ✨ Next Steps

1. ✅ Push your code to GitHub
2. ✅ Keep backend on Render (already configured)
3. ✅ Deploy frontend to Cloudflare Pages
4. ✅ Update frontend API URL
5. ✅ Test the deployed application
6. ✅ Set up custom domain (optional)

---

## 🔗 Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Workers](https://workers.cloudflare.com/)

---

**Need help?** Check the Cloudflare Pages documentation or contact support.
