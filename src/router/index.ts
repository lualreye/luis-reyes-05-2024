import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import layouts
const Layout = () => import('@/layouts/PokeLayout.vue');

// Import views
const Home = () => import('@/pages/Home.vue');
const Team = () => import('@/pages/Team.vue');
const TeamMemberDetail = () => import('@/pages/TeamMemberDetail.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Pokedex',
    component: Layout,
    meta: {
      title: "Gotta Catch 'Em All"
    },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/team',
        name: 'Team',
        component: Team,
      },
      {
        path: '/team/:id',
        name: 'Team Member Details',
        component: TeamMemberDetail,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  document.title = to.meta.title as string;

  next();
})

export default router;