import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import { useTheme } from 'next-themes';
enum ButtonTypes {
  'button',
  'submit',
  'reset',
  undefined
}
type ButtonType = "button" | "submit" | "reset";
type Props = {
  buttonType: string;
  buttonVariant: string;
  buttonPadding: string;
  buttonMargin: string;
  buttonWidth: string;
  buttonHeight: string;
  buttonColor: string;
  buttonBgColor: string;
  buttonBorderRadius: string;
  buttonFontSize: string;
  buttonFontWeight: number;
  buttonActionType: ButtonType;
  buttonFormAssociated: string;
  buttonLoading: boolean;
  buttonDisabled: boolean;
  buttonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
};

const Button = (props: Props) => {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if(!mounted) return null;
  return (
    <button
      className={`${style.button} ${style[props.buttonType]} ${
        style[props.buttonVariant]
      } ${style[resolvedTheme]}`}
      style={{
        width: props.buttonWidth,
        height: props.buttonHeight,
        padding: props.buttonPadding,
        margin: props.buttonMargin,
        fontSize: props.buttonFontSize,
        fontWeight: props.buttonFontWeight,
        backgroundColor: props.buttonBgColor
      }}
      type={props.buttonActionType || 'button'}
      disabled={props.buttonLoading ? true : props.buttonDisabled}
      onClick={props.buttonOnClick}
      form={props.buttonFormAssociated}
    >
      {props.buttonLoading ? (
        <svg
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={style.spinner}
        >
          <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
          <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
        </svg>
      ) : (
        props.buttonText
      )}
    </button>
  );
};
Button.defaultProps = {
  buttonType: 'primary',
  buttonVariant: 'contained',
  buttonPadding: '0.5rem 1.5rem',
  buttonMargin: '0 0.5rem',
  buttonWidth: 'auto',
  buttonHeight: 'auto',
  buttonColor: '',
  buttonBgColor: '',
  buttonBorderRadius: '',
  buttonFontSize: '1rem',
  buttonFontWeight: 500,
  buttonActionType: 'button',
  buttonFormAssociated: '',
  buttonLoading: false,
  buttonDisabled: false,
  buttonOnClick: (event: React.MouseEvent<HTMLButtonElement>) => {},
  buttonText: 'Click Here !'
};

export default Button;
