import React, { PropsWithChildren } from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Link,
  Preview,
  Tailwind,
  Font,
  Section,
  Row,
  Column,
  Img,
} from "@react-email/components";

interface EmailLayoutProps extends PropsWithChildren {
  preview: string;
}
const twConfig = {};
const baseurl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_APP_URL;

const EmailLayout = ({ children, preview = "" }: EmailLayoutProps) => {
  return (
    <Html>
      <Tailwind config={twConfig}>
        <Head>
          <Font fontFamily="Roboto" fallbackFontFamily={"Verdana"}></Font>
          <meta name="color-scheme" content="light-only"></meta>
          <meta name="supported-color-schemes" content="light-only"></meta>
        </Head>
        <Preview>{preview}</Preview>
        <Body
          style={{
            backgroundColor: "#f4f4f4",
            fontFamily:
              "-apple-system, BlinkMaxSystemFont, 'Roboto', sans-serif",
            margin: "0 auto",
            padding: "16px 16px 0 16px",
          }}
        >
          <Container style={{ margin: "0 auto" }}>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              <Section>
                <Row>
                  <Column align="center">
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={baseurl}
                    >
                      <Img
                        src={`${baseurl}/static/web-app-manifest-512x512.png`}
                      ></Img>
                    </Link>
                  </Column>
                </Row>
              </Section>
            </Container>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              {children}
            </Container>
            <Container
              style={{ backgroundColor: "#fff" }}
              className="rounded-lg p-4 2xl:p-6 mb-4 2xl:mb-6"
            >
              <Section>
                <Row>
                  <Column className="flex items-center" align="left">
                    <Img
                      className="w-16 h-16"
                      src={`${baseurl}/static/web-app-manifest-512x512.png`}
                    ></Img>
                  </Column>
                  <Column align="right">
                    {" "}
                    <address className="not-italic text-right text-xs">
                      <span className="text-gray-800">Car Dealer</span>
                      <br />1 Way, <br />
                      United Kingdom, W1 1AB <br />
                      <Link
                        className="text-blue-600 underline"
                        href={"mailto:hello@cardealer.com"}
                      >
                        hello@cardealer.com
                      </Link>
                    </address>
                  </Column>
                </Row>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailLayout;
