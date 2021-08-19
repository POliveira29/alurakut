import {WrapperList} from "../WrapperList";
import Link from "next/link";
import {IoIosArrowForward, IoIosArrowBack} from "react-icons/io";

function WrapperHeader(props) {
  return (
    <WrapperList>
      <h1 className="title">{props.title}</h1>
      <div>
        <span className="breadcrumb">
          <Link href="/">Inicio</Link>
          <IoIosArrowForward /> {props.title}
        </span>
        <hr />
        <div className="list__nav">
          <span className="amount-friends">
            mostrando{" "}
            <strong>
              {props.items.length === 0 ? 0 : 1}-{props.items.length}
            </strong>{" "}
            de&nbsp;
            <strong>{props.items.length}</strong>
          </span>
          <div className="nav-items">
            <Link className="nav-item" href="/friends">
              primeira
            </Link>
            <a className="nav-item" href="">
              <IoIosArrowBack /> anterior
            </a>
            <a className="nav-item" href="">
              próxima
            </a>
            <a className="nav-item" href="">
              última
            </a>
          </div>
        </div>
      </div>
    </WrapperList>
  );
}

export default WrapperHeader;
