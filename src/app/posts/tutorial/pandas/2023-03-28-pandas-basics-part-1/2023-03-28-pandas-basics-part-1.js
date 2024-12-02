// styles
import '../Pandas.css';

// modules
import Scrollspy, { ScrollspyHeader } from '../../../../components/Modules/Scrollspy/Scrollspy';

// downloads


export default function PandasBasics() {
    const sectionTitles = [
        'Notes',
        'Getting started',
        'Subsetting the data',
        'Saving the data'
    ];

    return (
        <>
            <Scrollspy sectionTitles={sectionTitles} />
            <div className='container-narrow'>
                <p id="prog-language" style={{ visibility: 'hidden' }}>python</p>

                {/* <ScrollspyHeader level={3} /> */}
                <ScrollspyHeader />
                <ul>
                    <li>This tutorial uses an interactive python notebook (ipynb). You can open an ipynb file in something like Jupyter notebook or VS Code.</li>
                    <li>No prior Python knowledge is required, but some basic coding skills may be useful in later tutorials.</li>
                    <li>
                        Download the notebook <a href={require("./pandas_basics.ipynb")} download={'pandas_basics.ipynb'} >here</a>
                    </li>
                    <li>
                        and the data <a href={require("./nba_21-22.csv")} download={"nba_21-22.csv"}>here</a>.
                    </li>
                </ul>

                {/* <ScrollspyHeader level={3} /> */}
                <ScrollspyHeader />
                <p><a href="https://pandas.pydata.org/docs/" target='blank'>pandas</a> is a data analysis package used to work with tabular (2-dimensional) data.</p>
                <p>Let's go through the basics with the above dataset of NBA player stats from the 2021-22 season from <a href="https://www.basketball-reference.com/leagues/NBA_2021_totals.html">basketball-reference.com</a>.
                </p>

                <h4>Imports</h4>
                <pre className="copy-pre"><code>import pandas as pd</code></pre>
                <p>The <code>as</code> keyword in Python lets you use the <code>pandas</code> package  an alias <code>pd</code>. This saves us some typing later on.</p>

                <h4>Reading in Data</h4>
                <p>Data files are usually csv or excel format, and they can be read with</p>
                <pre className="copy-pre"><code>data = pd.read_csv('nba21-22.csv')</code></pre>
                {/* https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html */}
                <p>Now that we've loaded in some data and assigned it to the aptly named <code>data</code>, let's learn some basic functions</p>

                <h4>Previewing the data</h4>
                You could display all the data by typing <code>data</code> in the cell, but that's usually unnecssary.
                There's also some important info that some of the methods can tell us.

                <pre className="copy-pre"><code>data.head() # shows the first 5 rows of the data, you can specify a different number of rows like head(3)</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[0] }}"></img> */}

                <pre className="copy-pre"><code>data.tail() # shows the last 5 rows of the data</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[1] }}"> */}

                <pre className="copy-pre"><code>data.columns # a list of all column names</code></pre>
                {/* <img className="tut-img-sm" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[2] }}"> */}
                <p>I usually use <code>columns</code> to check for any columns that I'd want to drop, rename, etc.</p>
                <br />

                <pre className="copy-pre"><code>data.dtypes # the data type of each column</code></pre>
                {/* <img className="tut-img-xxs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[3] }}"> */}
                <p><code>object</code> usually means the column type is string. This makes sense for the player name and position, the other columns also appear to have the correct types.</p>
                <br />

                <pre className="copy-pre"><code>data.shape # a tuple containing the shape of your dataframe: (rows,columns)</code></pre>
                {/* <img className="tut-img-xxs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[4] }}"> */}
                <br />
                <p><code>shape</code> is another one of those sanity-check methods. I usually use it as a quick way to check that I've added or removed some rows successfully.</p>

                <p>A method that gives quite a bit of essential info is <code>data.info()</code>.
                    Since it gives column types and number of non-null rows, it can tell you whether your columns are the correct type and whether there are missing values.</p>
                <pre className="copy-pre"><code>data.info(verbose=True) # columns, datatypes, and nonNA values</code></pre>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[5] }}">
                                                <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[6] }}"> */}


                {/* <ScrollspyHeader level={3} /> */}
                <ScrollspyHeader />
                pandas has three primary methods of subsetting data: by label/boolean with <code>.loc[]</code>, by index with <code>.iloc[]</code>, and selecting a column with <code>['column_name']</code> or <code>.column_name</code>.
                When indexing something like a 2d-array, indexing a subset of rows/columns would look like <code>array[row,col]</code>.

                <h4>Selecting columns</h4>
                <h5>Selecting one column</h5>
                <p>The simplest way to select a column is with dot or bracket notation:</p>
                <pre className="copy-pre"><code>data.Player # both return the player column
                    data['Player'] # note that .loc is not used here</code></pre>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[7] }}"> */}

                <p>We could also use <code>.loc[]</code> notation</p>.
                <pre className="copy-pre"><code>data.loc[:,'player'] # this also returns the player column</code></pre>
                <p>Here, the empty slice <code>:</code> returns all rows</p>

                <h5>Selecting multiple columns</h5>
                <p>We can select multiple columns with a list of column names or slice</p>
                <pre className="copy-pre"><code>data.loc[:,['Player','Age']] # this selects columns in the list</code></pre>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[8] }}"> */}
                <pre className="copy-pre"><code>data.loc[:,'Player':'Age'] # this selects columns between the start and end column (inclusive)</code></pre>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[9] }}"> */}


                <h4>Selecting rows</h4>
                <p>If we index with one indexer and no comma: <code>.loc[indexer]</code>, the dataframe will index by row.

                    <h5>Selecting one row</h5>
                    <pre className="copy-pre"><code>data.loc[3] # this selects the row with index '3'</code></pre>
                    Note that although 3 is an integer, it is interpreted as a label. If this row happened to have index label <code>'bam_adebayo'</code>, we would type <code>data.loc['bam_adebayo']</code> instead.</p>
                <p>Using <code>data.loc[3,]</code> returns the same result. Leaving the column index blank means that for the selected row(s), all columns are selected.</p>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[10] }}"> */}

                <h5>Selecting multiple rows</h5>
                <p>Selecting multiple rows functions similarly to selecting multiple columns.</p>
                <pre className="copy-pre"><code>data.loc[0:3] # this selects rows based on the slice</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[11] }}"> */}

                <pre className="copy-pre"><code>data.loc[[0,1,3]] # this selects rows based on the list of labels</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[12] }}"> */}

                <p>While the above methods are nice for selecting a few predetermined rows, in most cases, we'd like to select rows that satisfy some condition.
                    For example, we might want to select all players younger than 20. To do this, we would need a boolean array with True for players younger than 20 and False for players 20 or older.
                    We can get this with the following boolean expression: </p>
                <pre className="copy-pre"><code>data.Age &lt; 20 # this returns a boolean array where True indicates Age &lt; 20</code></pre>
                {/* <img className="tut-img-xs" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[13] }}"> */}

                <p>Since the above line returns a boolean array, we can just plug it into data.loc[], to select rows that match the condition:</p>
                <pre className="copy-pre"><code>data.loc[data.Age &lt; 20] # this uses the boolean array to select players with Age &lt; 20</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[14] }}"> */}

                <p>We can also use multiple boolean expressions to reflect multiple conditions. For example, how many younger than 20 players played in 30 or games:</p>
                <pre className="copy-pre"><code>data.loc[(data.Age &lt; 20) & (data.G &gt;= 30)] # this uses the boolean array to select players with Age &lt; 20 and G &gt;= 30</code></pre>
                {/* <img className="tut-img" src="{{ '../../static/images/tutorials/' +  filename + '/' + images[15] }}"> */}


                {/* <ScrollspyHeader level={3} /> */}
                <ScrollspyHeader />
                <p>Saving data is as straightforward as reading in data. Let's try saving the subset we created above.</p>
                <pre className="copy-pre"><code>sub_data = data.loc[(data.Age &lt; 20) & (data.G &gt;= 30)]
                    sub_data.to_csv('rookies_nba21-22.csv') # saves data into a csv file</code></pre>

                <h3>What's Next?</h3>
                <p className="last-content">In the <a>next tutorial</a>, we'll look into how we can iterate over and modify the data in a dataframe.</p>
            </div >
        </>
    )
}
