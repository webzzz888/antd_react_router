import { Alert, Button, Result, Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { OutletLayoutRouter } from 'components';
import Layout from '../component/Layout/index'
import type { MenuItem } from 'components';
import Dashboard from '../pages/dashboard';
import ErrorPage from '../pages/error-page';
import Login from '../pages/login';
import Register from '../pages/register';
import Food from '../pages/food';
import User from '../pages/user';
import Materials from '../pages/materials';
import Medicine from '../pages/medicine';
import Registration from '../pages/registration'
import Freshwater from '../pages/freshwater'
import Supplier from '../pages/supplier'
import Logistics from '../pages/logistics'

const Permissions = ({ children }: any) => {
  const token = sessionStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};



export const defaultRoutes: any = [
  {
    path: '/',
    element: <Permissions>{<Layout />}</Permissions>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
        {
        path: 'medicine',
        element: <Medicine />,
      },
      {
        path: 'food',
        element: <Food />,
      },
      {
        path: 'materials',
        element: <Materials />,
      },
      {
        path: 'freshwater',
        element: <Freshwater />,
      },
      {
        path: 'supplier',
        element: <Supplier />,
      },
      {
        path: 'supplier',
        element: <Supplier />,
      },
      {
        path: 'logistics',
        element: <Logistics />,
      },
      {
        path: '/*',
        element: (
          <ErrorPage>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={
                <Link to={'/'}>
                  <Button type="primary">Back Home</Button>
                </Link>
              }
            />
          </ErrorPage>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

// /**/ 表示二级目录 一般二级目录就够了  不够在加即可
export const modules = import.meta.glob('../pages/**/*.tsx');

function pathToLazyComponent(Ele: string) {
  const path = modules[`../${Ele}`] as any;
  if (!path)
    return (
      <ErrorPage>
        <Alert
          message={Ele + ':Cannot find the path, please configure the correct folder path'}
          type="error"
        />
      </ErrorPage>
    );
  const Components = lazy(path);
  return (
    <Suspense fallback={<Spin size="small" />}>
      <Components />
    </Suspense>
  );
}
export const filepathToElement = (list: MenuItem[]) =>

  list.map((item) => {
    console.log(item,11111111)
    if (item.children) {
      return {
        path: item.path,
        key: item.key,
        children: item.children?.map((c) => ({
          key: c.key,
          path: c.path,
          element: pathToLazyComponent(c.filepath),
        })),
        element: <OutletLayoutRouter />,
      };
    } else {
      return {
        key: item.key,
        path: item.path,
        element: pathToLazyComponent(item.filepath),
      };
    }
  });
