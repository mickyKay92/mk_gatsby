import React, { PureComponent } from 'react'
import posed, {PoseGroup} from 'react-pose'

const timeout = 250

class Transition extends PureComponent{
    render(){
        const {children, location} = this.props

        const RoutesContainer = posed.div({
            enter:{ deylay: timeout, delayChildren: timeout },
        })

        return(
          <PoseGroup>
              <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
          </PoseGroup>  
        );
    }
}
export default Transition