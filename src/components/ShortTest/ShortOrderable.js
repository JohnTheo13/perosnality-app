import React, { Component } from 'react';
import OrderableList from '../OrderableList';
import { get } from '../../api';

class ShortOrderable extends Component {
  constructor(props) {
    super(props);
    this.setState({ roles: [] });
  }

  async componentDidMount() {
    const { roleIds } = this.props;
    const roles = await get(`roles/${roleIds}`);
    this.setState({ roles });
  }

  render() {
    const { roles } = this.state;
    return roles.length && <OrderableList list={roles} />;
  }
}

export default ShortOrderable;
