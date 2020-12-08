import React from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PostCard({post: { body, createdAt, id, username, likeCount, commentCount, likes }}){

	function likePost(){
		console.log("Post liked.");
	}

	function commentOnPost(){
		console.log("Comment on post.");
	}

	return (
		<Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
				<Button as='div' labelPosition='right' onClick={likePost}>
					<Button color='red' basic>
						<Icon name='heart' />
					</Button>
					<Label basic color='red' pointing='left'>
						{likeCount}
					</Label>
				</Button>
				<Button as='div' labelPosition='right' onClick={commentOnPost}>
					<Button color='blue' basic>
						<Icon name='comments' />
					</Button>
					<Label basic color='blue' pointing='left'>
						{commentCount}
					</Label>
				</Button>
      </Card.Content>
    </Card>
	)
}

export default PostCard;