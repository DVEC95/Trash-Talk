import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Button, Card, Grid, Image, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth'; 
import DeleteButton from '../components/DeleteButton';
import LikeButton from '../components/LikeButton';

function SinglePost(props){
	const postId = props.match.params.postId;
	const { user } = useContext(AuthContext);

	function deletePostCallback(){
		props.history.push('/')
	}

	const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId }
  })

	let postMarkup;

	let rtn = data.getPost;
		
	const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = rtn;

		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image 
							src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
							size="small"
							float="right"
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{ username }</Card.Header>
								<Card.Meta>{ moment(createdAt).fromNow() }</Card.Meta>
								<Card.Description>{ body }</Card.Description>
							</Card.Content>
							<hr/>
						<Card.Content extra>
							<LikeButton user={ user } post={{ id, likeCount, likes }}/>
							<Button	
								as="div"
								labelPosition="right"
								onClick={ () => console.log('Comment on post.') }
							>
								<Button basic color="blue">
									<Icon name="comments"/>
								</Button>
								<Label basic color="blue" pointing="left">
									{ commentCount }
								</Label>
							</Button>
							{user && user.username === username && (
								<DeleteButton postId={id} callback={deletePostCallback}/>
							)}
						</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
	)
	
	return (
		<>
		{ loading ? (<h1>Loading posts...</h1>) : postMarkup } 
		</>
	);
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;