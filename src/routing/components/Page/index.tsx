import { FC } from 'react';
import { Button, Layout } from 'antd';
import logo from 'assets/logo.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOut } from 'features/user';
import './Page.css';

const { Header, Footer, Content } = Layout;

export const Page: FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/signin');
  };

  return (
    <Layout>
      <Header>
        <img src={logo} className="Page__logo" alt="logo" />
        <Button onClick={handleSignOut}>Sign out</Button>
      </Header>
      <Content className="Page__content">{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Test assignment</Footer>
    </Layout>
  );
};
