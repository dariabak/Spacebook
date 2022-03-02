import React, { Component } from 'react';
import { Toolbar, ToolbarBackAction, ToolbarContent, ToolbarAction } from 'react-native-paper';


class Bar extends Component {
render(){
    return (
        <Toolbar>
        <ToolbarBackAction
        onPress={this._goBack}
        />
        <ToolbarContent
        title="Title"
        subtitle="Subtitle"
        />
        <ToolbarAction icon="search" onPress={this._onSearch} />
        <ToolbarAction icon="more-vert" onPress={this._onMore} />
    </Toolbar>

    );
    }
}