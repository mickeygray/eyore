import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import EmailContext from "../../context/email/emailContext";
import parse from "html-react-parser";
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  Element,
  LivePreview,
  withLive,
} from "react-live";
import {
  Email,
  Item,
  Box,
  Span,
  A,
  Image,
  renderEmail,
} from "react-html-email";
import { v4 as uuidv4 } from "uuid";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import EmailPreview from "./EmailPreview";

const EmailCreator = () => {
  const emailContext = useContext(EmailContext);

  const { saveEmail } = emailContext;

  const headCSS = `#outlook a{padding:0}.ExternalClass{width:100%!important}.ExternalClass,.ExternalClass font,.ExternalClass p,.ExternalClass span,img{outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}a img{border:none}.appleLinksGrey a{color:#919191!important;text-decoration:none!important}.ExternalClass img[class^=Emoji]{width:10px!important;height:10px!important;display:inline!important}.CTA:hover{background-color:#5fdbc4!important}@media screen and (max-width:640px){.mobilefullwidth{width:100%!important;height:auto!important}.logo{padding-left:30px!important;padding-right:30px!important}.h1{font-size:36px!important;line-height:48px!important;padding-right:30px!important;padding-left:30px!important;padding-top:30px!important}.h2{font-size:18px!important;line-height:27px!important;padding-right:30px!important;padding-left:30px!important}.p{font-size:16px!important;line-height:28px!important;padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.CTA_wrap{padding-left:30px!important;padding-right:30px!important;padding-bottom:30px!important}.footer{padding-left:30px!important;padding-right:30px!important}.number_wrap{padding-left:30px!important;padding-right:30px!important}.unsubscribe{padding-left:30px!important;padding-right:30px!important}}`;

  const varFields = {
    firstName: "{{lead.firstName}}",
    lastName: "{{lead.lastName}}",
    fullName: "{{lead.fullName}}",
    address: "{{lead.address}}",
    city: "{{lead.city}}",
    state: "{{lead.state}}",
    zip: "{{lead.zip}}",
    county: "{{lead.county}}",
    type: "{{lead.type}}",
    plaintiff: "{{lead.plaintiff}}",
    amount: "{{lead.amount}}",
    dmDate: "{{lead.dmDate}}",
    lienDate: "{{lead.lienDate}}",
  };

  const paragraphStyle = {
    textIndent: "30px",
    marginLeft: "75px",
    marginRight: "75px",
    textAlign: "left",
  };

  const rectangleStyle = {
    height: "100px",
    width: "400px",
    border: "1px solid black",
    boxSizing: "border-box",
    paddingTop: "10px",
    paddingLeft: "5px",
  };

  const squareStyle = {
    height: "200px",
    width: "200px",
    border: "1px solid black",
    boxSizing: "border-box",
    paddingTop: "10px",
    paddingLeft: "5px",
  };

  const previewStyle = {
    display: "none",
    fontSize: "1px",
    color: "#333333",
    lineHeight: "1px",
    maxHeight: "0px",
    maxWidth: "0px",
    opacity: "0",
    overflow: "hidden",
  };

  const buttonStyle = {
    display: "inline-block",
    background: "#f4f4f4",
    color: "#333333",
    padding: "0.4rem 1.3rem",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    marginRight: "0.5rem",
    transition: "opacity 0.2s ease-in",
    outline: "none",
  };

  const scope = {
    Email,
    Item,
    Box,
    Span,
    A,
    Image,
    renderEmail,
    headCSS,
    varFields,
    paragraphStyle,
    rectangleStyle,
    squareStyle,
    buttonStyle,
    previewStyle,
  };

  const keyVal = uuidv4();

  useEffect(() => {
    setEmail({
      reactstring: "",
      title: "",
      html: "",
      text: "",
      subject: "",
      from: "",
      reactstring: "",
      key: keyVal,
    });
  }, []);

  const [email, setEmail] = useState({
    reactstring: "",
    title: "",
    text: "",
    subject: "",
    from: "",
    reactstring: "",
    key: keyVal,
    html: "",
  });

  const [showEmail, setEmailState] = useState(false);

  const toggleVisibility = useCallback(() => {
    setEmailState((prevState) => !prevState);
  }, []);

  const onChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    saveEmail(email);
    setEmail({
      reactstring: "",
      title: "",
      text: "",
      subject: "",
      from: "",
      reactstring: "",
      key: keyVal,
      html: "",
    });
  };

  const [preview, setPreview] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const onClick = (e) => {
    if (preview === true) {
      setPreview(false);
    } else if (preview === false) {
      setPreview(true);
    }
  };

  const onClick2 = (e) => {
    if (showCode === true) {
      setShowCode(false);
    } else if (showCode === false) {
      setShowCode(true);
    }
  };

  const { title, text, subject, from, reactstring, key, html } = email;
  return (
    <div>
      <div>
        <h3>
          Write React HTML to Render an email template, call varFields in /{} to
          render a variable field, currently available css injections include:
          buttonStyle, paragraphStyle, rectangleStyle, squareStyle{" "}
        </h3>
      </div>
      {!preview ? (
        <div>
          <LiveProvider
            code={"renderEmail(<Email headCSS={headCSS}><Item></Item></Email>)"}
            scope={scope}>
            <div className='grid-2'>
              <div className='card'>
                <LiveEditor />
              </div>
              <div
                className='card'
                style={{
                  width: "500px",
                  maxHeight: "400px",
                  overflow: "scroll",
                }}>
                {" "}
                <LivePreview />
              </div>
            </div>
          </LiveProvider>

          <div className='grid-2'>
            <div className='card'>
              <form action='post' onSubmit={onSubmit}>
                <input
                  value={title}
                  placeholder='Title'
                  type='text'
                  name='title'
                  onChange={onChange}
                />

                <input
                  placeholder='Text'
                  type='text'
                  name='text'
                  onChange={onChange}
                  value={text}
                />
                <input
                  value={subject}
                  placeholder='Subject'
                  type='text'
                  name='subject'
                  onChange={onChange}
                />
                <input
                  placeholder='From'
                  type='text'
                  name='from'
                  onChange={onChange}
                  value={from}
                />

                <input
                  type='text'
                  value={reactstring}
                  placeholder='reactstring'
                  type='text'
                  name='reactstring'
                  onChange={onChange}
                />

                <input
                  type='text'
                  value={html}
                  placeholder='html'
                  type='text'
                  name='html'
                  onChange={onChange}
                />
              </form>
            </div>

            <div className='card'>
              <CodeMirror
                options={{
                  mode: "xml",
                  theme: "material",
                  lineNumbers: true,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className='card'>
            <EmailPreview {...email} />
          </div>
        </Fragment>
      )}

      <br />
      <div className='grid-2'>
        <button className='btn btn-block btn-danger' onClick={onSubmit}>
          Create Email
        </button>

        <button className='btn btn-block btn-success' onClick={onClick}>
          Preview Email
        </button>
      </div>
    </div>
  );
};

export default EmailCreator;
