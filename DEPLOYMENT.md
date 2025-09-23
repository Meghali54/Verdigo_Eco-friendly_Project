# 🚀 Deployment Guide for VerdiGo

This guide will help you deploy VerdiGo to various platforms.

## 🌐 Vercel Deployment (Frontend)

### Method 1: Vercel Website (Recommended)

1. **Visit [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Import Project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose `Meghali54/Verdigo_Eco-friendly_Project`

3. **Configure Settings**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables** (if needed):
   - Add any required environment variables
   - Example: `VITE_API_URL`, `VITE_GOOGLE_MAPS_API_KEY`

5. **Deploy**: Click "Deploy" and wait for the build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy: `Y`
   - Which scope: Choose your account
   - Link to existing project: `N` (for first deployment)
   - Project name: `verdigo-eco-platform`
   - Directory: `frontend`

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

## 🖥️ Backend Deployment Options

### Option 1: Railway (Recommended)

1. **Visit [railway.app](https://railway.app)**
2. **Connect GitHub account**
3. **Deploy from GitHub**:
   - Select your repository
   - Set root directory to `backend`
   - Railway will auto-detect Node.js

4. **Environment Variables**:
   ```
   PORT=3000
   NODE_ENV=production
   # Add other required variables
   ```

### Option 2: Render

1. **Visit [render.com](https://render.com)**
2. **Create Web Service**:
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node index.js`

### Option 3: Heroku

1. **Install Heroku CLI**
2. **Create Heroku app**:
   ```bash
   heroku create verdigo-backend
   ```

3. **Set buildpack**:
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

4. **Deploy**:
   ```bash
   git subtree push --prefix backend heroku main
   ```

## 🔧 Environment Configuration

### Frontend Environment Variables

Create `.env` in frontend directory:
```env
VITE_API_URL=https://your-backend-url.com
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_ENVIRONMENT=production
```

### Backend Environment Variables

```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

## 📝 Deployment Checklist

### Pre-deployment
- [ ] All environment variables configured
- [ ] Build process works locally (`npm run build`)
- [ ] No console errors in production build
- [ ] API endpoints tested
- [ ] CORS configured for production domains

### Frontend (Vercel)
- [ ] Build successful
- [ ] Routes working (SPA routing configured)
- [ ] Assets loading correctly
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

### Backend
- [ ] Server starts without errors
- [ ] Database connected (if applicable)
- [ ] API endpoints responding
- [ ] CORS configured for frontend domain
- [ ] Environment variables set

## 🌐 Custom Domain Setup

### Vercel Custom Domain
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### SSL Certificate
- Vercel automatically provides SSL certificates
- For custom domains, SSL is configured automatically

## 📊 Monitoring and Analytics

### Vercel Analytics
1. Enable Vercel Analytics in project settings
2. View performance metrics in Vercel dashboard

### Error Tracking
Consider adding error tracking services:
- Sentry
- LogRocket
- Bugsnag

## 🔄 Continuous Deployment

### Automatic Deployment
- Vercel automatically deploys on push to main branch
- Configure branch-based deployments for staging

### GitHub Actions
The project includes CI/CD workflow in `.github/workflows/ci-cd.yml`

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are listed in package.json
   - Check for TypeScript errors

2. **Routing Issues**:
   - Ensure `vercel.json` has proper rewrites configuration
   - Check React Router setup

3. **API Connection Issues**:
   - Verify CORS configuration
   - Check environment variables
   - Ensure API URLs are correct

4. **Large Bundle Size**:
   - Implement code splitting
   - Use lazy loading for routes
   - Optimize images and assets

### Performance Optimization

1. **Code Splitting**:
   ```jsx
   const LazyComponent = lazy(() => import('./Component'));
   ```

2. **Image Optimization**:
   - Use WebP format
   - Implement lazy loading
   - Optimize image sizes

3. **Bundle Analysis**:
   ```bash
   npm run build -- --analyze
   ```

## 📞 Support

If you encounter issues during deployment:
- Check Vercel documentation
- Review build logs
- Test locally with production build
- Check community forums

---

**Happy Deploying! 🚀**