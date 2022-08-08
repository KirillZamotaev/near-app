import { FC } from 'react';
import { Button, Layout } from 'antd';
import logo from 'assets/logo.svg';
import { useUser } from 'features/user';
import './Page.css';

const { Header, Footer, Content } = Layout;

export const Page: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, signOut } = useUser();
  const handleSignOut = () => {
    signOut();
  };

  return (
    <Layout>
      <Header>
        <img src={logo} className="Page__logo" alt="logo" />
        {isSignedIn && <Button onClick={handleSignOut}>Sign out</Button>}
      </Header>
      <Content className="Page__content">{children}</Content>
      <Footer style={{ textAlign: 'center' }}>Test assignment</Footer>
    </Layout>
  );
};
