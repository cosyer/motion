import React, { PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import FileUpload from '../components/Upload/FileUpload'
import RichTextEditor from '../components/Upload/richTextEditor'
import {message} from 'antd';


function Upload({ location, dispatch, upload }) {
  const {value,previewVisible,commentVisible,commentLoading,previewImage,fileList,commentData} = upload
  const fileUploadProps={
    previewVisible:previewVisible,
    previewImage:previewImage,
    fileList:fileList,
    handlePreview(file){
      dispatch({
        type: 'upload/querySuccess',
        payload: {previewImage:file.url || file.thumbUrl,previewVisible:true},
      })
    },
    handleRemove(file){
      dispatch({
        type: 'upload/deleteFile',
        payload: {uid:file.uid,url:file.url},
      })
    },
    handleCancel(){
      dispatch({
        type: 'upload/querySuccess',
        payload: {previewVisible:false},
      })
    },
    handleChange(value){
      dispatch({
        type: 'upload/querySuccess',
        payload: {fileList:value},
      })
    }
  }
  const richTextEditorProps={
    value:value,
    commentData:commentData,
    commentVisible:commentVisible,
    commentLoading:commentLoading,
    onChange(value){
      dispatch({
        type: 'upload/onChange',
        payload: value,
      })
    },
    onSubmit(){
      var textData=eval('(' + value.toString('raw') + ')')
      dispatch({
        type: 'upload/onSubmit',
        payload: textData.blocks[0].text,
      })
    },
    showComment(){
      dispatch({
        type: 'upload/showComment'
      })
    },
    handleCancel(){
      dispatch({
        type: 'upload/querySuccess',
        payload: {commentVisible:false},
      })
    }
  }
  return (
    <div style={{paddingLeft:10}}>
    <div style={{marginTop:74}}></div>
    <FileUpload {...fileUploadProps}/>
    <RichTextEditor {...richTextEditorProps}/>
    </div>
    
    )
}

Upload.propTypes = {
  upload: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps({ upload }) {
  return { upload }
}

export default connect(mapStateToProps)(Upload)
