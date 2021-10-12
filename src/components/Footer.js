import {List, ListInlineItem} from 'reactstrap';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-7'>
                        <span>@2021 Ghisleni Gabriele</span>
                    </div>
                    <div className='col-5' style={{textAlign:'right'}}>
                    <List type="inline">
                        <ListInlineItem>
                            <a href='@'><i class="fa fa-github fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='@'><i class="fa fa-linkedin fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='@'><i class="fa fa-facebook fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='@'><i class="fa fa-instagram fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                        <a href='@'><i class="fa fa-info fa-lg"></i></a>
                        </ListInlineItem>
                    </List>
                        


                    </div>
                </div>
            </div>
        </div>
    );
}