import React from 'react';
import { Link } from 'gatsby';
import Home from '../pages/home';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1
        style={{
          // ...scale(1.5),
          // marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    );
  } else {
    header = (
      <h3
        style={{
          fontFamily: `Montserrat, sans-serif`,
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    );
  }
  return (
    <>
      <ProLayout
        layout={'top'}
        navTheme={'light'}
        fixedHeader={true}
        footerRender={() => (
          <DefaultFooter
            links={[
              { key: 'test', title: 'layout', href: 'www.alipay.com' },
              { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
            ]}
            copyright="这是一条测试文案"
          />
        )}
      >
        <Home />
      </ProLayout>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          // maxWidth: rhythm(24),
          // padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  );
};

export default Layout;
