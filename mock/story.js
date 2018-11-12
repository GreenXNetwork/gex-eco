import pathToRegexp from 'path-to-regexp';

const PROJECT_STORIES = {
    1: '<p><strong style="font-size: large;">Project Details</strong></p><p>The project is in South Africa and is a solar panel system installed on the roof of a government building.</p><p><br></p><p><strong style="font-size: large;">Investment Terms</strong></p><p>This investment is an electricity buy-back agreement. Project Alpha sells 1,000,000 GXAlpha Certificates at $1 each.</p><p>Each Certificate grants the holder the benefits below:</p><ul><li>Each GXAlpha Certificates grants the right to buy 1 Watt of electricity every time Project Alpha generates 1 MegaWatt at 0 cost.</li><li>The electricity is automatically bought back by Project Alpha at current electricity rate.</li><li>The total sum is converted to GEX and transfer to the Certificate holder’s wallet quarterly.</li><li>The duration of each GXAlpha Certificate is 20 years, equals to 80 pay-back periods.</li></ul><p><br></p><p><strong>Expected Returns</strong></p><p>The expected returns of GXAlpha holders per annum is calculated below:</p><p><br></p><p>System Size</p><p class="ql-align-right">1200 kWp</p><p>Expected Energy Produced Annually</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1,836,431 kWp</p><p>Price per kWp</p><p class="ql-align-right">0.139 USD</p><p>Annual Revenue</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;255,263.89 USD</p><p>Initial Investment</p><p class="ql-align-right">1,000,000 USD</p><p><strong>Rate of return</strong><strong> 26%</strong><br/><br/><br/></p>',
    2: '<p><strong style="font-size: large;">Project Details</strong></p><p>The project is in South Africa and is a solar panel system installed on the roof of a government building.</p><p><br></p><p><strong style="font-size: large;">Investment Terms</strong></p><p>This investment is an electricity buy-back agreement. Project Alpha sells 1,000,000 GXAlpha Certificates at $1 each.</p><p>Each Certificate grants the holder the benefits below:</p><ul><li>Each GXAlpha Certificates grants the right to buy 1 Watt of electricity every time Project Alpha generates 1 MegaWatt at 0 cost.</li><li>The electricity is automatically bought back by Project Alpha at current electricity rate.</li><li>The total sum is converted to GEX and transfer to the Certificate holder’s wallet quarterly.</li><li>The duration of each GXAlpha Certificate is 20 years, equals to 80 pay-back periods.</li></ul><p><br></p><p><strong>Expected Returns</strong></p><p>The expected returns of GXAlpha holders per annum is calculated below:</p><p><br></p><p>System Size</p><p class="ql-align-right">1200 kWp</p><p>Expected Energy Produced Annually</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1,836,431 kWp</p><p>Price per kWp</p><p class="ql-align-right">0.139 USD</p><p>Annual Revenue</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;255,263.89 USD</p><p>Initial Investment</p><p class="ql-align-right">1,000,000 USD</p><p><strong>Rate of return</strong><strong> 26%</strong></p>',
    3: '<p><strong style="font-size: large;">Project Details</strong></p><p>The project is in South Africa and is a solar panel system installed on the roof of a government building.</p><p><br></p><p><strong style="font-size: large;">Investment Terms</strong></p><p>This investment is an electricity buy-back agreement. Project Alpha sells 1,000,000 GXAlpha Certificates at $1 each.</p><p>Each Certificate grants the holder the benefits below:</p><ul><li>Each GXAlpha Certificates grants the right to buy 1 Watt of electricity every time Project Alpha generates 1 MegaWatt at 0 cost.</li><li>The electricity is automatically bought back by Project Alpha at current electricity rate.</li><li>The total sum is converted to GEX and transfer to the Certificate holder’s wallet quarterly.</li><li>The duration of each GXAlpha Certificate is 20 years, equals to 80 pay-back periods.</li></ul><p><br></p><p><strong>Expected Returns</strong></p><p>The expected returns of GXAlpha holders per annum is calculated below:</p><p><br></p><p>System Size</p><p class="ql-align-right">1200 kWp</p><p>Expected Energy Produced Annually</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1,836,431 kWp</p><p>Price per kWp</p><p class="ql-align-right">0.139 USD</p><p>Annual Revenue</p><p class="ql-align-right">&nbsp;&nbsp;&nbsp;255,263.89 USD</p><p>Initial Investment</p><p class="ql-align-right">1,000,000 USD</p><p><strong>Rate of return</strong><strong> 26%</strong></p>',
};

export function getFakeStory(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/projects/:project_id/story').exec(url);

    const projectId = re[1];

    const story = PROJECT_STORIES[projectId] || [];

    if (res && res.json) {
        res.json(story);
    } else {
        return story;
    }
}

export default PROJECT_STORIES;
