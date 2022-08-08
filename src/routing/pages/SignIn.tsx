import { Page } from 'routing/components/Page';
import { Button, Card, Form } from 'antd';
import { useUser } from 'features/user';
import { Spinner } from 'routing/components/Loader';

export const SignIn: React.FC<{}> = () => {
  const { isLoading, signIn } = useUser();

  const onFinish = (values: any) => {
    signIn(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Page>
      <Form
        className="form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card style={{ width: 300, height: 300,  display: 'flex', justifyContent: 'center', }}>
            <h1 style={{ padding: '5rem' }}>Welcome!</h1>
            <Form.Item>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
            {isLoading && <Spinner />}
          </Card>
        </div>
      </Form>
    </Page>
  );
};
