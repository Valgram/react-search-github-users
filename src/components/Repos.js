import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
    const { repos } = React.useContext(GithubContext);

    //11
    const languages = repos.reduce((total, item) => {
        // 18
        const { language, stargazers_count } = item;
        //12
        if (!language) return total;
        //13
        if (!total[language]) {
            //14-19
            total[language] = { label: language, value: 1, stars: stargazers_count };
        } else {
            //15
            total[language] = {
                ...total[language],
                value: total[language].value + 1,
                stars: total[language].stars + stargazers_count,
            };
        }

        return total;
        //11-12
    }, {});

    //16
    const mostUsed = Object.values(languages)
        .sort((a, b) => {
            return b.value - a.value;
        })
        .slice(0, 5);

    //most stars per language
    const mostPopular = Object.values(languages)
        .sort((a, b) => {
            return b.stars - a.value;
        })
        .map((item) => {
            return { ...item, value: item.stars };
        })
        .slice(0, 5);
    // stars,forks
    let { stars, forks } = repos.reduce(
        (total, item) => {
            const { stargazers_count, name, forks } = item;
            total.stars[stargazers_count] = { label: name, value: stargazers_count };
            total.forks[forks] = { label: name, value: forks };
            return total;
        },
        {
            stars: {},
            forks: {},
        }
    );
    //20
    stars = Object.values(stars).slice(-5);
    forks = Object.values(forks).slice(-5);

    return (
        <section className='section'>
            <Wrapper className='section-center'>
                {/* //17 */}
                <Pie3D data={mostUsed} />
                <Column3D data={stars} />
                <Doughnut2D data={mostPopular} />
                <Bar3D data={forks} />
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    gap: 2rem;
    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
        grid-template-columns: 2fr 3fr;
    }

    div {
        width: 100% !important;
    }
    .fusioncharts-container {
        width: 100% !important;
    }
    svg {
        width: 100% !important;
        border-radius: var(--radius) !important;
    }
`;

export default Repos;
//11 using the reduce method, we have two parameters, the second one its what we are returning (the total)
//and the first the exact iteration(IT MEANS total its gonna be the one that its gonna change, example the first round the value its gonna be empty,
//the second its gonna be the value that is save in language in my array that its javascript and so on)
// , you can name it anything you want (total, item)
//we have to make sure to return the total(or the parameter is in that position)

//18 the item its gonna be each item in my array (mockRepo), an we are d structuring the the value of language and stargazer count

//12 if the language is not there(if you console log, yo will see, how yo repeat html, javascript and css, and sometimes is comes out null)
//then return the total, that remenber the first spin its gonna be empty value

//13 if the total language is empty (its not true) then the total language is gonna be equal to my object
// { label: language, value: 1, stars: stargazers_count };

//with the before steps we can now how many javascript, css, and html we have
//
//14 in this case we are trying to save the results as an object like we did with char data

//15 if  total language exists the n bring the values that i have before ,{ label: language, value: 1, stars: stargazers_count };
//but i wanna add one the value that i have before, and i wanna change the stargazer count, i wanna  sum the prev value with the new

//15 it the same tha before we wanna add a + 1 to value but  dinamically
//we use the spread operator with total[language] to add all the properties
//get me the value, an get me total in any of the value(css,html, javascript)
//and add 1
//object value return the values from the boject (in this case my object is languages)
//16 object value, and sort to organize the way we wanna render the properties
//(css, html, js), so we wanna the most popular be the first
//return b.value - a.value (with this i an gonna assure that the higher value is returned)
// we add another method that its slice, and essencially we are gonna copy
//part of our array so the parameters inside would be index 0 and index 5
//with this we only want to return my 5 most popular languages

//17 we put it in our pie

//vid 260

//19 is happening the same thing as before, but with the stargazer_count
//reduce is like a map,
//20 -5, the last 5
