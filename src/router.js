import VueRouter from 'vue-router';
import Hello from './components/Hello';
import Auth from './components/Auth';
import AuthSuccess from './components/AuthSuccess';

// redirect from accountchooser is losing hash and redirects to the root
// so I check query string if it exists
const checkFromAuth = (to, from, next) => {
  console.log(window.location.search);
  const query = window.location.search.substr(1).split('=');
  if (query[0] === 'mode') {
    next({
      path: '/auth',
      query: { mode: query[1] },
    });
  } else {
    next();
  }
};

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Hello, beforeEnter: checkFromAuth },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess },
  ],
});
router.beforeEach((to, from, next) => {
  // check for auth
  next();
});

export default router;
