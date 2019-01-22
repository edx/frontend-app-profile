import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

class EditableContent extends React.Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
    this.content = React.createRef();

    this.state = {
      height: 'auto',
      containerRef: this.container,

      // Mirroring props in state as described here:
      // https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md#state-derived-from-propsstate
      mirroredIsEditing: props.isEditing,
    };

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.mirroredIsEditing !== nextProps.isEditing) {
      return {
        height: prevState.containerRef.current.offsetHeight,
        mirroredIsEditing: nextProps.isEditing,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.isEditing !== prevProps.isEditing) {
      // See https://github.com/airbnb/javascript/issues/1875 for why ignoring this line in linter.
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        height: this.content.current.offsetHeight,
      });

      const focusableElements = this.content.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements[0]) focusableElements[0].focus();
    }
  }

  onTransitionEnd() {
    this.setState({ height: 'auto' });
  }

  render() {
    const {
      isEditing,
      disabled,
      renderStatic,
      renderEditable,
      renderEditing,
    } = this.props;

    const transitionProps = {
      timeout: 250,
      classNames: 'crossfade',
      unmountOnExit: true,
      mountOnEnter: true,
      onExited: this.onTransitionEnd,
    };

    return (
      <div
        ref={this.container}
        className="editable-content-container"
        style={{ height: this.state.height }}
      >
        <CSSTransition in={!isEditing} {...transitionProps}>
          <div ref={!isEditing ? this.content : null} className="editable-content">
            {disabled ? renderStatic(this.props) : renderEditable(this.props) }
          </div>
        </CSSTransition>

        <CSSTransition in={isEditing} {...transitionProps}>
          <div ref={isEditing ? this.content : null} className="editable-content">
            {renderEditing(this.props)}
          </div>
        </CSSTransition>
      </div>
    );
  }
}


EditableContent.propTypes = {
  isEditing: PropTypes.bool,
  disabled: PropTypes.bool,
  renderStatic: PropTypes.func,
  renderEditable: PropTypes.func,
  renderEditing: PropTypes.func,
};

EditableContent.defaultProps = {
  isEditing: false,
  disabled: false,
  renderStatic: () => {},
  renderEditable: () => {},
  renderEditing: () => {},
};


export default EditableContent;
