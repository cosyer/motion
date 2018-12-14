import React, { PropTypes } from 'react'
import { routerRedux,hashHistory } from 'dva/router'
import { connect } from 'dva'
import Main from '../components/Manage/main'
import CommentModal from '../components/Manage/commentModal'
import {message} from 'antd';

function Manage({ location, dispatch, manage }) {
  const { loading,commentData,markValue,bookData,quotationData,accountData,selectedRowKeys,selectedRowValue,commentVisible,commentModalType,tabsValue} = manage;
  const mainProps={
    loading:loading,
    commentData:commentData,
    bookData:bookData,
    quotationData:quotationData,
    accountData:accountData,
    selectedRowKeys:selectedRowKeys,
    onSelectChange(key,value){
     dispatch({
       type: 'manage/selectchange',
       payload: {key,value}
     })
    },
    onAdd(){
    dispatch({
      type:'manage/showCommentModal',
      payload:{
        commentModalType:'add'
      }
    })
    },
    onDeleteItem(){
    if(selectedRowValue.length>0){
      dispatch({
        type:'manage/deleteComment'
      })  
    }
    else message.error("请先选择数据")
    },
    onSearch(value){
    dispatch({
    type:'manage/searchComment',
    payload:{keyword:value}
    })
    },
    onEditItem(){
    if(selectedRowValue.length>0){
    if(selectedRowValue.length>1){
    message.error("只能选择单条数据")
    return false
    }
    dispatch({
    type:'manage/showCommentModal',
    payload:{
      commentModalType:'edit'
    }
    })
    }
    else message.error("请先选择数据")
    },
    signOut(){
    localStorage.clear()
    hashHistory.push('/login')
    },
    reload(){
    dispatch({type:'manage/query'})
    },
    onChange(value){
      dispatch({type:'manage/querySuccess',payload:{tabsValue:value}})
    }
}
const commentModalProps={
  visible:commentVisible,
  markValue:markValue,
  item:commentModalType=='add'?{}:selectedRowValue[0],
  title:commentModalType=='add'?'添加评论':'修改评论',
  onCancel(){
    dispatch({
      type:'manage/hideCommentModal'
    })
  },
  onOk(value){
    if(commentModalType=='add'){
     dispatch({
      type:'manage/addComment',
      payload:value
    })
   }
   else  dispatch({
    type:'manage/editComment',
    payload:value
  })
 },
 changeMark(value){
   dispatch({
      type:'manage/querySuccess',
      payload:{markValue:value}
    })
 }
}
{/*编辑后渲染缓存*/}
// const CommentModalGen = () =>
// <CommentModal {...commentModalProps} />
return (
  <div>
  <div style={{marginTop:64}}></div>
  <Main {...mainProps}/>
  <CommentModal {...commentModalProps} />
  </div>
  )
}

Manage.propTypes = {
  manage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}
function mapStateToProps({ manage }) {
  return { manage }
}

export default connect(mapStateToProps)(Manage)
