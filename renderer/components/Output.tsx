


type Props = {
    index: number;
    cmd: string;
}

const Output: React.FC<Props> = ({ index, cmd }) => {
    return (
        <div className="output" key={index}>
            <span className="prompt">[root@localhost ~]$</span>
            <span className="cmd">{cmd}</span>
        </div>
    )
}


export default Output;