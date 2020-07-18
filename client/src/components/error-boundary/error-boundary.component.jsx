import React from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        return;
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="ErrorImageOverlay">
                    <div className="ErrorImageContainer" style={{ backgroundImage: 'url("https://i.imgur.com/lKJiT77.png")' }}></div>
                    <h2 className="ErrorImageText">Oops, An Error Has Occurred, A Dog Ate This Page</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;