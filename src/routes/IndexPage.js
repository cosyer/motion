import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import Index from "../components/Home/index";
import { BackTop } from "antd";

function IndexPage(location, dispatch, indexPage) {
  const { loading } = indexPage;

  return (
    <div>
      <Index />
      <BackTop />
    </div>
  );
}

IndexPage.propTypes = {
  indexPage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps({ indexPage }) {
  return { indexPage };
}

export default connect(mapStateToProps)(IndexPage);
