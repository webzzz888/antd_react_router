import type { FC } from 'react';
import {useEffect} from 'react'
import styles from './style.module.scss';
import TitleText from './../../component/Title'
import { Divider } from 'antd';

const Workplace = () => {
  useEffect(() => {
    
    return () => {
      console.log('1231111111111')
    }
  },[])
  return <>
   {/* <TitleText title="系统首页"/>
   <Divider /> */}
  <div className={styles.dashboard}>欢迎使用，物流管理系统</div>
  </>;
};
export default Workplace;
