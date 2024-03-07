import './main.css';

import { ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './app';
// import store from "./store";
import { store, Provider } from 'store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);
root.render(
  <Provider store={store}>
    <HashRouter
      // 生产环境配置二级路径
      basename={'/' + import.meta.env.BASE_URL.replaceAll('/', '')}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677FF',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </HashRouter>
  </Provider>
);
