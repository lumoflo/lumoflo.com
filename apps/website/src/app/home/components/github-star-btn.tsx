"use client"
import GitHubButton from 'react-github-btn'

const GithubStarBtn = ({className}:{className?:any}) =>{
    return(
        <div className={`flex flex-row items-center h-fit ${className}`}>
            <GitHubButton href="https://github.com/lumoflo/lumoflo.com" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" data-show-count="true" aria-label="Star lumoflo/lumoflo.com on GitHub">Star</GitHubButton>
        </div>
    )
}

export default GithubStarBtn