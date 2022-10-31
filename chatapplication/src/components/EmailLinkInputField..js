import React from 'react'
import './emaillinkinputfield.css';


const STYLES = "email--link--default"
    

export const EmailLinkInputField = ({ 
    children, 
    type, 
    onClick, 
    emailLinkStyle
}) => {

    const checkemailLinkStyle = STYLES.includes(emailLinkStyle) ? emailLinkStyle : STYLES;

    return (
        <div>
            <div className={`emailinputfield ${checkemailLinkStyle}`}onClick={onClick} type={type}>
                    {children}
            </div>
        </div>
    )
}

/* 
// COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

<div>
    <div>
    <EmailLinkInputField onClick={() => {console.log("You clicked on me!")}}
      type="input"
      emailLinkStyle="email--link--default"
      label="Name"
      >
      <div className='email-l-div'>
      <div className='email-label-div'>
          <label for="...">Name</label>
          <div className='input'>
              <input className='email-link-input' type="text" placeholder='Name' />
          </div>
      </div>
  </div>

  </EmailLinkInputField>
  </div>
</div>




*/