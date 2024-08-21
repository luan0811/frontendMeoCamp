// src/components/Footer.tsx
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      ©2024 Your Company. All Rights Reserved.
    </AntFooter>
  );
};

export default Footer;
