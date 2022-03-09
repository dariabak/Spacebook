import { Children, Component } from "react";


class ContextProvider extends Component {

    redner() {
        return(
            <ContextProvider.Provider >
                {this.props.children}
            </ContextProvider.Provider>
        );
    }

}

export default ContextProvider;