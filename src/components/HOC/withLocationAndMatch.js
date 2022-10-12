import { useParams, useLocation } from "react-router-dom";

export const withLocationAndMatch = Component => props => {
    const params = useParams();
    const location = useLocation();
    return <Component {...props} params={params} location={location}/>;
};