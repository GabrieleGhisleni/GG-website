import {List, ListInlineItem} from 'reactstrap';

export const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <span>@2021 Ghisleni Gabriele</span>
                    </div>
                    <div className='col' style={{textAlign:'right'}}>
                    <List type="inline">
                        <ListInlineItem>
                            <a href='https://github.com/GabrieleGhisleni'><i class="fa fa-github fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='https://www.linkedin.com/in/gabriele-ghisleni-bb553a199/'><i class="fa fa-linkedin fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='https://www.facebook.com/gabriele.ghisleni.125'><i class="fa fa-facebook fa-lg"></i></a>
                        </ListInlineItem>
                        <ListInlineItem>
                            <a href='https://www.instagram.com/g_gabry_/'><i class="fa fa-instagram fa-lg"></i></a>
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