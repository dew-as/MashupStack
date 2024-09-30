class counter extends React.components {
    constructor(props) {
       super(props);
       this.state = { count : 0};
                                            }
render (){
    return(
        <div>
            <h1>{this.state.count}</h1>
        </div>
);
}
}