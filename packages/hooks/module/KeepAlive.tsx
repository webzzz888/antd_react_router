// import React from 'react';
// import { memo, useEffect, useMemo, useReducer, useRef } from 'react';
// import { useLocation, useOutlet } from 'react-router-dom';

// const KeepAlive = () => {
//   // useOutlet能拿到Outlet 占位容器内所存放的组件对象
//   const outlet = useOutlet();

//   const { pathname } = useLocation();

//   const componentList = useRef(new Map());
//   // @ts-ignore
//   const forceUpdate = useReducer((bool) => !bool)[1]; // 强制渲染
//   const cacheKey = useMemo(() => pathname, [pathname]);
//   const activeKey = useRef<string>('');


//   useEffect(() => {
//     activeKey.current = cacheKey;
//     if (!componentList.current.has(activeKey.current)) {
//       componentList.current.set(activeKey.current, outlet);
//     }
//     forceUpdate();
//   }, [cacheKey]); // eslint-disable-line
//   console.log(componentList.current,8888)
//   console.log(Array.from(componentList.current))
//   // console
//   return (
//     <>
//       {Array.from(componentList.current).map(([key, component]) => (
//         <div key={key}>
//           {key === activeKey.current ? (
//             <div>{component}</div>
//           ) : (
//             <div style={{ display: 'none' }}>{component}</div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// export default memo(KeepAlive);


import React from 'react';
import { memo, useEffect, useReducer, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';

const KeepAlive = () => {
  // useOutlet能拿到Outlet 占位容器内所存放的组件对象
  const outlet = useOutlet();

  const { pathname } = useLocation();

  const componentList = useRef(new Map());
  // @ts-ignore
  const forceUpdate = useReducer((bool) => !bool)[1]; // 强制渲染

  useEffect(() => {
    if (!componentList.current.has(pathname)) {
      componentList.current.set(pathname, outlet);
    }
    forceUpdate();
  }, [pathname]); // eslint-disable-line

  return (
    <>
      {Array.from(componentList.current).map(([key, component]) => (
        <div key={key}>
          {key === pathname ? (
            <div>{component}</div>
          ) : (
            <div style={{ display: 'none' }}>{component}</div>
          )}
        </div>
      ))}
    </>
  );
};

export default memo(KeepAlive);
