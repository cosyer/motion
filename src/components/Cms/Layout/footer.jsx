import React from "react";
import styles from "./main.less";
import { props } from "../../../utils";
const Footer = () => <div className={styles.footer}>{props.footerText}</div>;

export default Footer;
