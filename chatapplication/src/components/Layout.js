import './Layout.css';

export default function Layout(props)
{
    return(
        <div className="Structure">{props.children}</div>
    );
}