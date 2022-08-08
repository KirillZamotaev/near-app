import { FC } from 'react';
import { Button, Layout } from 'antd';
import logo from 'assets/logo.svg';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signOut } from 'features/user';

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
        <img src={logo} className="App__logo" alt="logo" />
        <Button onClick={handleSignOut}>Sign out</Button>
      </Header>
      <Content className="App__content">{children}</Content>
      <Footer>Test assignment</Footer>
    </Layout>
  );
};
