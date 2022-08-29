import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      end: true,
    };
    length = this.state.data.length;
    data = this.state.data.slice();
  }

  checkScroll(e) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    if (this.state.data.length >= length * 3) {
      this.setState((prevState) => ({
        data: prevState.data.slice(length * 2),
      }));
    }

    if (contentOffset.y <= this.props.offset) {
      this.setState(
        (prevState) => ({
          data: [...prevState.data, ...data],
        }),
        () => this.infListRef.scrollToIndex({ index: length, animated: false })
      );
    }
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - this.props.offset &&
      this.state.end
    ) {
      this.setState((prevState) => ({
        data: [...prevState.data, ...data],
        end: false,
      }));
    } else {
      this.setState({
        end: true,
      });
    }

    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
  }

  componentDidMount() {
    this.setState((prevState) => ({
      data: [...prevState.data, ...prevState.data],
    }));
    setTimeout(() => {
      this.infListRef.scrollToIndex({ animated: false, index: length });
    }, 500);
  }

  render() {
    return (
      <FlatList
        {...this.props}
        ref={(ref) => {
          this.infListRef = ref;
        }}
        data={this.state.data}
        renderItem={this.props.renderItem}
        onScroll={(e) => this.checkScroll(e)}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
      />
    );
  }
}

InfiniteScroll.propTypes = {
  offset: PropTypes.number,
  showsVerticalScrollIndicator: PropTypes.bool,
};

InfiniteScroll.defaultProps = {
  offset: 20,
  showsVerticalScrollIndicator: false,
};
