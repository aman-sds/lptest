import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchListFromServer } from "../actions";
import Search from "antd/lib/input/Search";
import { Pagination, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

class List extends React.Component {
   state = { keyword: "dog", page: 1 };
   componentDidMount() {
      const { keyword } = this.state;
      this.props.fetchListFromServer(keyword);
   }

   search = keyword => {
      this.setState({ keyword });
      this.props.fetchListFromServer(keyword, 1);
      this.setState({ page: 1 });
   };

   pageChange = page => {
      const { list = {} } = this.props;
      this.setState({ page });
      const { keyword } = this.state;
      this.props.fetchListFromServer(keyword, page, list.total);
   };
   render() {
      const { page, keyword } = this.state;
      const { list = {} } = this.props;
      return (
         <div className="container">
            <Search onChange={e => this.setState({ keyword: e.target.value })} placeholder="Search" value={keyword} enterButton="Search" size="large" onSearch={keyword => this.search(keyword)} />
            <div>
               {
                  <div>
                     {list.data ? (
                        list.data.length === 0 ? (
                           <Empty description="Nothing Found" />
                        ) : null
                     ) : (
                        <div className="empty_box">
                           <LoadingOutlined style={{ fontSize: "32px", color: "#08c" }} />
                        </div>
                     )}
                  </div>
               }
               <div className="stickers_grid">
                  {list.data &&
                     list.data.map(d => {
                        return (
                           <div onClick={() => window.open(d._source.source_url)} className="sticker_item">
                              <img alt="" src={d._source.thumb} />
                              <p>{d._source.name}</p>
                           </div>
                        );
                     })}
               </div>
            </div>
            <div className="pagination">
               <Pagination onChange={this.pageChange} showSizeChanger={false} current={page} total={list.total} />
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, props) => ({
   list: state.data.list
});

const mapDispatchToProps = dispatch => bindActionCreators({ fetchListFromServer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);
