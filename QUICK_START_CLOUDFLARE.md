# 🚀 Quick Cloudflare Deployment Guide

Follow these simple steps to deploy your Van Monitoring System to Cloudflare Pages.

## 📋 Prerequisites

- GitHub account
- Cloudflare account (free)
- Your backend already deployed on Render (you have this)

---

## ⚡ Quick Steps

### 1️⃣ Push to GitHub

Make sure all your code is pushed to GitHub:

```bash
git add .
git commit -m "Ready for Cloudflare deployment"
git push origin main
```

### 2️⃣ Login to Cloudflare

1. Go to https://dash.cloudflare.com/
2. Sign up or login
3. Click on **Pages** in the left sidebar

### 3️⃣ Create New Project

1. Click **"Create a project"**
2. Click **"Connect to Git"**
3. Select **GitHub** and authorize Cloudflare
4. Select your repository: `ISElec3_BSIS3B_Framework_NoSQL_Van-Monitoring`

### 4️⃣ Configure Build Settings

Fill in these settings:

```
Project name: van-monitoring
Production branch: main
Framework preset: Vite
Build command: cd frontend && npm install && npm run build
Build output directory: frontend/dist
Root directory: (leave empty)
```

### 5️⃣ Add Environment Variables

Before clicking "Save and Deploy", scroll down to **Environment variables**:

Click **"Add variable"**:
- Variable name: `VITE_API_URL`
- Value: Your backend URL (e.g., `https://your-app.onrender.com`)

### 6️⃣ Deploy!

Click **"Save and Deploy"**

Wait 2-3 minutes for the build to complete.

---

## ✅ After Deployment

### Get Your URL

After deployment, you'll get a URL like:
```
https://van-monitoring.pages.dev
```

### Update Backend CORS

Update your backend `app.js` to allow requests from your new Cloudflare URL:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://van-monitoring.pages.dev',
    // Add your custom domain here if you have one
  ],
  credentials: true
}));
```

Then redeploy your backend on Render.

---

## 🎉 That's It!

Your app should now be live at `https://van-monitoring.pages.dev`

---

## 🔄 Automatic Deployments

Every time you push to GitHub, Cloudflare will automatically rebuild and deploy your site!

---

## 🐛 Common Issues

### 1. CORS Error
**Problem**: Can't connect to backend
**Solution**: Update CORS settings in backend (see above)

### 2. API Not Working
**Problem**: 404 errors when calling API
**Solution**: Check `VITE_API_URL` is set correctly in Cloudflare dashboard

### 3. Build Failed
**Problem**: Build fails in Cloudflare
**Solution**: Check build logs, make sure build command is correct

---

## 📱 Testing

Test these features after deployment:
- ✅ View vans list
- ✅ Create reservation
- ✅ Driver login
- ✅ Driver registration
- ✅ Admin panel (make sure to access via your backend URL)

---

## 🌐 Custom Domain (Optional)

In Cloudflare Pages:
1. Go to **Custom domains**
2. Click **"Set up a custom domain"**
3. Follow the instructions

---

## 💡 Tips

- **Preview deployments**: Every branch gets its own preview URL
- **Rollbacks**: You can rollback to any previous deployment
- **Analytics**: Enable Cloudflare Web Analytics for free
- **Free SSL**: Cloudflare provides free SSL certificates

---

## 📚 Need More Help?

See the full guide: [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)

---

**Happy Deploying! 🎊**
