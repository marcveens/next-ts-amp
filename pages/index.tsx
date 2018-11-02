import * as React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

type IndexProps = {
    amp: boolean;
    ampUrl: string;
    data: [];
};

export default class extends React.Component<IndexProps> {
    static async getInitialProps({ req, query }: { req: Request, query: any }) {
        const amp = query.amp === '1';
        const url = req ? req.url : window.location.href;
        const ampUrl = amp ? url.replace('?amp=1', '') : url + '?amp=1';

        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();

        return { amp, ampUrl, data };
    }

    render() {
        const {amp, ampUrl, data} = this.props;

        return (
            <>
                <Head>
                    {
                    amp ? (
                        <link rel="canonical" href={ampUrl} />
                    ) : (
                        <link rel="amphtml" href={ampUrl} />
                    )
                    }
                    <style amp-custom="">{`
                    body {
                        margin: 0;
                    }
                    .page {
                        margin: 5px;
                    }
                    .header a {
                        margin-right: 20px
                    }
                    `}</style>
                </Head>
                <div>Welcome to next.js!</div>
                <ul>
                {data.map((item: any, index: number) => (
                    <li key={index}>{item.name}</li>
                ))}
                <br />
                {
                    amp ? (
                        // @ts-ignore Yes we know it doesn't exist on JSX for now
                        <amp-img alt="To amp or not to amp"
                            src="./static/amp.jpg"
                            width="373"
                            height="480" />
                    ) : (
                        <img src="./static/amp.jpg" />
                    )
                }
                </ul>
            </>
        );
    }
}