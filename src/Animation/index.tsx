import { Redirect, Route, Switch } from 'react-router-dom';
import { Question1 } from './Question1';
import { Question2 } from './Question2';
import { Question3_1 } from './Question3_1';
import { Question3_2 } from './Question3_2';
import { Question3_3 } from './Question3_3';
import { Question3_4 } from './Question3_4';
import { Question4_1 } from './Question4_1';
import { Question4_2 } from './Question4_2';
import { Question4_3 } from './Question4_3';
import { Question4_4 } from './Question4_4';
import { Question4_5 } from './Question4_5';
import { Question6 } from './Question6';
import { Question7 } from './Question7';
import { Question8 } from './Question8';

export const Router = () => {
    return (
        <Switch>
            <Route path='/Question1' component={Question1} exact />
            <Route path='/Question2' component={Question2} />
            <Route path='/Question3-1' component={Question3_1} />
            <Route path='/Question3-2' component={Question3_2} />
            <Route path='/Question3-3' component={Question3_3} />
            <Route path='/Question3-4' component={Question3_4} />
            <Route path='/Question4-1' component={Question4_1} />
            <Route path='/Question4-2' component={Question4_2} />
            <Route path='/Question4-3' component={Question4_3} />
            <Route path='/Question4-4' component={Question4_4} />
            <Route path='/Question4-5' component={Question4_5} />
            <Route path='/Question6' component={Question6} />
            <Route path='/Question7' component={Question7} />
            <Route path='/Question8' component={Question8} />
            <Redirect to='/Question1' />
        </Switch>
    );
};
