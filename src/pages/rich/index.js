import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjs from 'draftjs-to-html'

class Rich extends Component {

    state = {
        showRichText: false,
        editorState: ''
    }
    // 在编辑的时候将编辑状态存储起来
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    //清空富文本中内容
    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }
    //获取富文本中内容
    handleGetContent = () => {
        this.setState({
            showRichText: true
        })
    }
    // 当内容发送变化时候处理内容
    onEditorChange = (contentState) => {
        this.setState({
            contentState
        })
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent} >清空内容</Button>
                    <Button type="primary" onClick={this.handleGetContent} >获取HTML内容</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange} //输入内容发送变化时获取内容的方法
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>this.setState({showRichText:false})}
                    footer={null}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}

export default Rich;