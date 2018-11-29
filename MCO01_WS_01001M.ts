//공통
@IonicPage({ name: 'MCO01_WS_01001M' })
@Component({
    selector: 'MCO01_WS_01001M',
    templateUrl: 'MCO01_WS_01001M.html'
})

export class MCO01_WS_01001M {
    rcvNo: string = '';         //접수번호
    rcvNoResult: string = '';  //접수번호-변경확인
    dsrnk: string = '';         //재해서열
    dsrnkList = [];             //재해서열 리스트
    plrnk: string = '';         //증권서열
    hmgdCfcd: string = '';      //인물구분코드
    clcfCd: string = '';        //보상구분코드
    clcfList = [];              //보상구분리스트
    selectedDsrnk: string = ''; //선택된 재해서열
    selectedClcf: string = '';  //선택된 보상구분
    formCd: string = '';        //서류코드
    formText: string = '추가서류';
    sendTab: string = 'custom';
    selectedCustomFax: string = '';
    customTelAreaNo: string = '';
    customTelExchNo: string = '';
    customTelSeq: string = '';
    customEmailId: string = '';
    customEmailDomainNm: string = '';
    selectedPartnerFax: string = '';
    rpairCmpny: string = '';
    rpairCmpnyCd: string = '';
    partnerTelAreaNo: string = '';
    partnerTelExchNo: string = '';
    partnerTelSeq: string = '';
    partnerEmailId: string = '';
    partnerEmailDomainNm: string = '';
    customSendType: string = 'fax';
    partnerSendType: string = 'fax';
    paramFlag: boolean = false;
    /* 인물구분코드 추가 yyg 추가 01:인  02:물*/
    empType: string = this.globalContext.user.empType;

    xmlData: string = '';

    telCombo = [];

    docList = {};
    //favoriteList = [];

    iptBoolean = false;

    resetData(param: string) {
        this.rcvNo = param;
        this.dsrnk = '';
        this.dsrnkList = [];
        this.plrnk = '';
        this.hmgdCfcd = '';
        this.clcfCd = '';
        this.clcfList = [];
        this.selectedDsrnk = '';
        this.selectedClcf = '';
        this.formCd = '';
        this.formText = '추가서류';
        this.sendTab = 'custom';
        this.selectedCustomFax = '';
        this.customTelAreaNo = '';
        this.customTelExchNo = '';
        this.customTelSeq = '';
        this.customEmailId = '';
        this.customEmailDomainNm = '';
        this.selectedPartnerFax = '';
        this.rpairCmpny = '';
        this.rpairCmpnyCd = '';
        this.partnerTelAreaNo = '';
        this.partnerTelExchNo = '';
        this.partnerTelSeq = '';
        this.partnerEmailId = '';
        this.partnerEmailDomainNm = '';
        this.customSendType = 'fax';
        this.partnerSendType = 'fax';
        this.xmlData = '';
        this.empType = this.globalContext.user.empType;

        this.iptBoolean = false;
    }

    constructor(
        app: App,
        private http: HttpSender,
        private logger: Logger,
        private globalContext: GlobalContext,
        private navCtrl: NavController,
        private dialogService: DialogService,
        private commonService: CommonService,
        private navParams: NavParams,
    ) {

    }

    /**
     * 서식/출력발송 진입
     */
    ngOnInit() {
        this.logger.debug(">>>>>>>> 서식/출력발송 진입");

        //전화번호COMBO
        // this.commonService.getComnCd('759089').subscribe(result => { 
        //     if(result.proframeHeader.pfmResponseCode == 'COMI0104'){ 
        //         let comnList = result.body.comnCdListINDTO;
        //         for(let i=0;i<comnList.length; i++) {
        //             this.telCombo.push({
        //                 key     : comnList[i].dtlCd.trim(),
        //                 value   : comnList[i].dtlCd.trim()
        //             })
        //         }
        //     } 
        // }); 

        /**
         *출력문서목록 및 속성 
         **/
        // this.docList['CO991046'] = {formCd : 'CO991046', formNm : '지불보증서', hmgdCfcd : '', inskdCd :'01', calngPcNm : 'ClfePaymtGrnotePC', calngOpratNm : 'getClfePaymtGrnote', inputInfo : ClfePaymtGrnoteCDTO, prntInfo : ClfePaymtGrnoteDTO, jobKeyInfo : 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm : 'divCo', jobCfcd : '1', filter : '01', filter2 : '01'};
        // this.docList['CO991026'] = {formCd : 'CO991026', formNm : '사고사실확인원(비보험자/계약자용)', hmgdCfcd : '', inskdCd :'', calngPcNm : '', calngOpratNm : '', inputInfo : '', prntInfo : '', jobKeyInfo : '', divNm : '', jobCfcd : '', filter : '', filter2 : ''};
        // this.docList['CO991027'] = {formCd : 'CO991027', formNm : '사고사실확인원(재해자용)', hmgdCfcd : '', inskdCd :'', calngPcNm : '', calngOpratNm : '', inputInfo : '', prntInfo : '', jobKeyInfo : '', divNm : '', jobCfcd : '', filter : '', filter2 : ''};
        // this.docList['CO991159'] = {formCd : 'CO991159', formNm : '사고사실확인원(재해물소유자용', hmgdCfcd : '', inskdCd :'', calngPcNm : '', calngOpratNm : '', inputInfo : '', prntInfo : '', jobKeyInfo : '', divNm : '', jobCfcd : '', filter : '', filter2 : ''};

        //this.favoriteList = ['CO991046', 'CO991046', 'CO991027', 'CO991159'];
        this.docList['CO991046'] = { formCd: 'CO991046', formNm: '지불보증서', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'ClfePaymtGrnotePC', calngOpratNm: 'getClfePaymtGrnote', inputInfo: ClfePaymtGrnoteCDTO, prntInfo: ClfePaymtGrnoteDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991026'] = { formCd: 'CO991026', formNm: '사고사실확인원(피보험자/계약자용)', hmgdCfcd: '', inskdCd: '', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getAccFctCnfmWonByPolhdPrnt', inputInfo: ClaimComnPrntCDTO, prntInfo: AccFctCnfmWonByPolhdPrntDTO, jobKeyInfo: 'rcvNo', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991027'] = { formCd: 'CO991027', formNm: '사고사실확인원(재해자용)', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getAccFctCnfmWonByIjpPrnt', inputInfo: ClaimComnPrntCDTO, prntInfo: AccFctCnfmWonByIjpPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991159'] = { formCd: 'CO991159', formNm: '사고사실확인원(재해물소유자용)', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getAccFctCnfmWonForDmgthPrnt', inputInfo: ClaimComnPrntCDTO, prntInfo: AccFctCnfmWonByDmgthPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };

        this.docList['CO991005'] = { formCd: 'CO991005', formNm: '통합보상접수서', hmgdCfcd: '', inskdCd: '', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getItgrcRprt', inputInfo: StringINDTO, prntInfo: ItgrcRprtDTO, jobKeyInfo: 'stringValue', divNm: 'divCo', jobCfcd: '1', filter1: '', filter2: '' };
        this.docList['CO991080'] = { formCd: 'CO991080', formNm: '자동차보상접수서', hmgdCfcd: '', inskdCd: '', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getItgrcCar', inputInfo: StringINDTO, prntInfo: ItgrcCarDTO, jobKeyInfo: 'stringValue', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991223'] = { formCd: 'CO991223', formNm: '자동차보상접수서(QR)', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getItgrcCarQR', inputInfo: CoInqCDTO, prntInfo: ItgrcCarDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991226'] = { formCd: 'CO991226', formNm: '보상체크시트 및 진행경과기록', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'ProgElapMngtPC', calngOpratNm: 'getProgElapRcdPrntInfo', inputInfo: CoInqCDTO, prntInfo: ProgElapRcdPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991227'] = { formCd: 'CO991227', formNm: '진행경과기록', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'ProgElapMngtPC', calngOpratNm: 'getProgElapRcdPrntInfo', inputInfo: CoInqCDTO, prntInfo: ProgElapRcdPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991077'] = { formCd: 'CO991077', formNm: '자동차보험계약조회문', hmgdCfcd: '', inskdCd: '', calngPcNm: 'ItgrcInfoPrntPC', calngOpratNm: 'getCarContInq', inputInfo: CarContInqCDTO, prntInfo: CarContInqDTO, jobKeyInfo: 'rcvNo|pcno|plcyChtms', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991001'] = { formCd: 'CO991001', formNm: '자동차 인사고 종결 및 손해사정보고서', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'CstanMngtInfoPrntPC', calngOpratNm: 'getCstanMngtInfo', inputInfo: CstanMngtCDTO, prntInfo: CstanMngtInfoDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991002'] = { formCd: 'CO991002', formNm: '자동차 물사고 종결 및 손해사정보고서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'CstanMngtDmgInfoPrntPC', calngOpratNm: 'getCstanMngtDmgInfo', inputInfo: ClaimInfoCDTO, prntInfo: CstanMngtDmgInfoDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991242'] = { formCd: 'CO991242', formNm: '자동차수리비지급상세내역서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'CarGdsDmgInfoPrntPC', calngOpratNm: 'getRprxpnPySpcfctCfstPrnt', inputInfo: ClaimComnPrntCDTO, prntInfo: RprxpnPySpcfctPrntUDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991045'] = { formCd: 'CO991045', formNm: '자동차보험금지급청구서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991276'] = { formCd: 'CO991276', formNm: '입원간병비청구서', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991048'] = { formCd: 'CO991048', formNm: '자동차사고처리안내장', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'IjpStmScrenPC', calngOpratNm: 'getIjpInsbnfPyProcsInformForm', inputInfo: IjpInsbnfPyProcsInformFormDTO, prntInfo: IjpInsbnfPyProcsInformFormDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991058'] = { formCd: 'CO991058', formNm: '정부보장사업지급청구서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991272'] = { formCd: 'CO991272', formNm: '합의서_대인용', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991301'] = { formCd: 'CO991301', formNm: '합의서_대인용(고령자용)', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991273'] = { formCd: 'CO991273', formNm: '대인배상보험금지급항목별안내문(책임개시이전)', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991274'] = { formCd: 'CO991274', formNm: '대인배상보험금지급항목별안내문(책임개시이후)', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991060'] = { formCd: 'CO991060', formNm: '합의서_무보험차상해용', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991061'] = { formCd: 'CO991061', formNm: '합의서_자동차상해용', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991162'] = { formCd: 'CO991162', formNm: '보험금지급동의서_대물용', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991063'] = { formCd: 'CO991063', formNm: '자동차탑승경위서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991064'] = { formCd: 'CO991064', formNm: '교통사고피해자본인확인서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991074'] = { formCd: 'CO991074', formNm: '자동차전손안내문', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'CarTotlsClaimInsContMngtPC', calngOpratNm: 'getCarTotlsClaimInsContMngt', inputInfo: CarTotlsClaimInsContMngtCDTO, prntInfo: CarTotlsClaimInsContMngtDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991153'] = { formCd: 'CO991153', formNm: '자동차전손대체비용안내문', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'CarTotlsClaimInsContMngtPC', calngOpratNm: 'getCarTotlsReplacXpnsGdoc', inputInfo: CoInqCDTO, prntInfo: CarTotlsReplacXpnsGdocDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991160'] = { formCd: 'CO991160', formNm: '전손대체비용보상안내(프리미엄차량담보특약용)', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getAccBasicInfoForPlusSpcc', inputInfo: ClaimComnPrntCDTO, prntInfo: PlusSpccPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991078'] = { formCd: 'CO991078', formNm: '출동서비스이용확인서', hmgdCfcd: '', inskdCd: '', calngPcNm: 'MvoSvcUtilCnfshtPC', calngOpratNm: 'getMvoSvcUtilCnfsht', inputInfo: StringINDTO, prntInfo: MvoSvcUtilCnfshtUDTO, jobKeyInfo: 'stringValue', divNm: 'divMvo', jobCfcd: '1', filter1: '01', filter2: '02' };

        //this.docList['CO991101'] = {formCd:'CO991101', formNm:'현장출동결과보고서', hmgdCfcd:'', inskdCd:'', calngPcNm:'SpmvPrintPC', calngOpratNm:'getSpmvResltRpt', inputInfo:MvoResltCDTO, prntInfo:SpmvResltRptUDTO, jobKeyInfo:'rcvNo|mvoDgre', divNm:'divMvo', jobCfcd:'1', filter1:'01', filter2:''};

        this.docList['CO991083'] = { formCd: 'CO991083', formNm: '교통사고사실확인원발급요청서(자사계약)', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getCarAccFctCnfmReqstInfo', inputInfo: StringINDTO, prntInfo: CarAccFctCnfmReqstDTO, jobKeyInfo: 'stringValue', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991122'] = { formCd: 'CO991122', formNm: '재해물상세관리시트', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'DmgthDelMngtSeatPC', calngOpratNm: 'getDmgthDelMngtSeat', inputInfo: DmgthDelMngtSeatCDTO, prntInfo: DmgthDelMngtSeatDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991140'] = { formCd: 'CO991140', formNm: '개인(신용)정보처리표준동의서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991142'] = { formCd: 'CO991142', formNm: '가불금(가지급금)지급청구서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991143'] = { formCd: 'CO991143', formNm: '구상금분쟁심의동의서', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991133'] = { formCd: 'CO991133', formNm: '대물고액사고보고서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'HiamtAccInfoPC', calngOpratNm: 'getHiamtAccInfoByPrint', inputInfo: HiamtAccInfoCDTO, prntInfo: HiamtAccInfoUDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991267'] = { formCd: 'CO991267', formNm: '미지급 보험금 안내문', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'PpdmIndrtLossInsbnfDlngInfoPC', calngOpratNm: 'getNopayInsbnfGdocInfoPrnt', inputInfo: NopayInsbnfGdocInfoPrntCDTO, prntInfo: NopayInsbnfGdocInfoPrntUDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991290'] = { formCd: 'CO991290', formNm: '잔존물 회수 요청서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'SvvobjMngtPC', calngOpratNm: 'getSvvobjClctReqInfoPrnt', inputInfo: SvvobjClctReqInfoPrntCDTO, prntInfo: SvvobjClctReqInfoPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991307'] = { formCd: 'CO991307', formNm: '사고차량 잔존물매각 확인서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'SvvobjDispslRqstPC', calngOpratNm: 'getAccVehclSvvobjDispslCnfshtPrnt', inputInfo: SvvobjDispslRqstInfoDTO, prntInfo: AccVehclSvvobjDispslCnfshtPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd|rqstRank', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991308'] = { formCd: 'CO991308', formNm: '사고차량 가치평가의뢰 확인서', hmgdCfcd: '02', inskdCd: '01', calngPcNm: 'SvvobjDispslRqstPC', calngOpratNm: 'getAccVehclSvvobjDispslCnfshtPrnt', inputInfo: SvvobjDispslRqstInfoDTO, prntInfo: AccVehclSvvobjDispslCnfshtPrntDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd|rqstRank', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '02' };
        this.docList['CO991100'] = { formCd: 'CO991100', formNm: '송금의뢰서', hmgdCfcd: '', inskdCd: '', calngPcNm: 'RemitRqstFormPrntPC', calngOpratNm: 'getRemitRqstFormPrntInfo', inputInfo: RemitRqstFormPrntCDTO, prntInfo: RemitRqstFormPrntDTO, jobKeyInfo: 'empNo', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        //s:특별히 확인하자
        this.docList['CO991151'] = { formCd: 'CO991151', formNm: '자동차사고환자입원상태점검서', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'IjpInhosStatChkSendInfoPC', calngOpratNm: 'getIjpInhosStatChkSendFormInfo', inputInfo: IjpInhosStatChkCDTO, prntInfo: IjpInhosStatChkInfoDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        //e:특별히 확인하자
        this.docList['CO991233'] = { formCd: 'CO991233', formNm: '진료기록열람및사본발급동의서/위임장', hmgdCfcd: '', inskdCd: '', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991243'] = { formCd: 'CO991243', formNm: '교통사고보고서열람청구서', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getTrfaccRptPrsalReqdocPrnt', inputInfo: ClaimComnPrntCDTO, prntInfo: TrfaccRptPrsalReqdocDTO, jobKeyInfo: 'rcvNo', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991256'] = { formCd: 'CO991256', formNm: '양방치료사실확인서', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991318'] = { formCd: 'CO991318', formNm: '양방치료사실확인서(통원)', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991310'] = { formCd: 'CO991310', formNm: '교통사고환자 진료기록 확인 요청서', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991306'] = { formCd: 'CO991306', formNm: '新한방치료사실확인서', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991258'] = { formCd: 'CO991258', formNm: '보험 계약기간(책임개시) 확인서', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'AccFctCnfmWonPrntPC', calngOpratNm: 'getInsContPrdCnfshtPrnt', inputInfo: StringINDTO, prntInfo: InsContPrdCnfshtPrntDTO, jobKeyInfo: 'stringValue', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        //s:특별히 확인하자
        this.docList['CO991240'] = { formCd: 'CO991240', formNm: '보상처리진행안내문', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'AccDlngIntgrnInformPrntPC', calngOpratNm: 'getInsbnfPySpcfctInformInfo', inputInfo: ClaimInfoCDTO, prntInfo: CarClaimDlngProgPrntUDTO, jobKeyInfo: 'rcvNo', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        //e:특별히 확인하자
        this.docList['CO991264'] = { formCd: 'CO991264', formNm: '보험금청구서류안내장', hmgdCfcd: '', inskdCd: '01', calngPcNm: '', calngOpratNm: '', inputInfo: '', prntInfo: '', jobKeyInfo: '', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '' };
        this.docList['CO991270'] = { formCd: 'CO991270', formNm: '대인배상보험금세부지급항목별안내(피보험자용)', hmgdCfcd: '', inskdCd: '01', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getBdyinjIndemInsbnfPrntInfo', inputInfo: CoInqCDTO, prntInfo: BdyinjIndemInsbnfInfoPrntUDTO, jobKeyInfo: 'rcvNo', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };
        this.docList['CO991271'] = { formCd: 'CO991271', formNm: '대인배상보험금세부지급항목별안내(재해자용)', hmgdCfcd: '01', inskdCd: '01', calngPcNm: 'ItgrcMstPrntPC', calngOpratNm: 'getBdyinjIndemInsbnfPrntInfo', inputInfo: CoInqCDTO, prntInfo: BdyinjIndemInsbnfInfoPrntUDTO, jobKeyInfo: 'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm: 'divCo', jobCfcd: '1', filter1: '01', filter2: '01' };

        //아마도 filter1 == '01'만 자동차
        // this.docList['CO991108'] = {formCd:'CO991108', formNm:'일반장기 인사고 종결 및 손해사정보고서', hmgdCfcd:'01', inskdCd:'04', calngPcNm:'GnltTrmntAndAdjstRptPC', calngOpratNm:'getGnltTrmntAndAdjstRpt', inputInfo:GnltTrmntAndAdjstRptCDTO, prntInfo:GnltTrmntAndAdjstRptDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991109'] = {formCd:'CO991109', formNm:'일반장기 물사고 종결 및 손해사정보고서', hmgdCfcd:'02', inskdCd:'04', calngPcNm:'GnltTrmntAndAdjstRptPC', calngOpratNm:'getGnltTrmntAndAdjstRpt', inputInfo:GnltTrmntAndAdjstRptCDTO, prntInfo:GnltTrmntAndAdjstRptDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991034'] = {formCd:'CO991034', formNm:'일반/장기보험금지급청구서(인보험)', hmgdCfcd:'', inskdCd:'', calngPcNm:'ItgrcMstPrntPC', calngOpratNm:'getGnltInsbnfReqdoc', inputInfo:StringINDTO, prntInfo:StringINDTO, jobKeyInfo:'stringValue', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'02'};
        // this.docList['CO991302'] = {formCd:'CO991302', formNm:'일반/장기보험금지급청구서_실버용(큰글씨)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'02'};
        // this.docList['CO991214'] = {formCd:'CO991214', formNm:'일반/장기보험금지급청구서(재물배상)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'02'};
        // this.docList['CO991069'] = {formCd:'CO991069', formNm:'일반/장기보험금청구접수증', hmgdCfcd:'', inskdCd:'', calngPcNm:'InsbnfRequstPC', calngOpratNm:'getListInsbnfRequstByRcvNo', inputInfo:StringINDTO, prntInfo:InsbnfRequstUDTO, jobKeyInfo:'stringValue', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991121'] = {formCd:'CO991121', formNm:'일반/장기보험금지급설명서', hmgdCfcd:'', inskdCd:'04', calngPcNm:'GnltDcibnInfoPrntPC', calngOpratNm:'getGnltPyibjGdocInfo', inputInfo:ClaimInfoCDTO, prntInfo:GnltPyibnGdocDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd|dcsnDgre', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991216'] = {formCd:'CO991216', formNm:'치과치료확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991261'] = {formCd:'CO991261', formNm:'비급여치료확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991298'] = {formCd:'CO991298', formNm:'요양병원치료확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991299'] = {formCd:'CO991299', formNm:'비급여입원치료분석지(요양병원)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991319'] = {formCd:'CO991319', formNm:'한방병원치료확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991322'] = {formCd:'CO991322', formNm:'안과치료확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'01'};
        // this.docList['CO991070'] = {formCd:'CO991070', formNm:'해외여행Claim청구서(상해/질병)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'02'};
        // this.docList['CO991113'] = {formCd:'CO991113', formNm:'해외여행Claim청구서(배상/휴대품 손해)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'02'};
        // this.docList['CO991119'] = {formCd:'CO991119', formNm:'보험금 부지급 안내문', hmgdCfcd:'', inskdCd:'', calngPcNm:'InsbnfPltRnkGdocPrntPC', calngOpratNm:'getInsbnfPltRnkGdocPrnt', inputInfo:InsbnfPltRnkGdocPrntCDTO, prntInfo:InsbnfPltRnkGdocPrntInqDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991123'] = {formCd:'CO991123', formNm:'보험금지급절차안내문', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:''};
        // this.docList['CO991124'] = {formCd:'CO991124', formNm:'개인정보동의서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991277'] = {formCd:'CO991277', formNm:'개인정보동의서(보험수익자용)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991125'] = {formCd:'CO991125', formNm:'위임장_사망사고', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991126'] = {formCd:'CO991126', formNm:'위임장_보험금및동의', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991164'] = {formCd:'CO991164', formNm:'보험금수령방식동의서', hmgdCfcd:'', inskdCd:'04', calngPcNm:'DcibnPayeePrntPC', calngOpratNm:'getInsbnfAcptMethAgret', inputInfo:ClaimInfoCDTO, prntInfo:InsbnfAcptMethAgretDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991201'] = {formCd:'CO991201', formNm:'면부책 판단 현장조사 결과 체크리스트(인보험)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991202'] = {formCd:'CO991202', formNm:'면부책 판단 현장조사 결과 체크리스트(재물)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991203'] = {formCd:'CO991203', formNm:'면부책 판단 현장조사 결과 체크리스트(배상)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991219'] = {formCd:'CO991219', formNm:'진료기록 열람 및 사본 발급 위임장 및 동의서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991221'] = {formCd:'CO991221', formNm:'정보공개 청구서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991222'] = {formCd:'CO991222', formNm:'정보공개 위임장', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991196'] = {formCd:'CO991196', formNm:'보험금산정결과에 따른 지급요청서', hmgdCfcd:'', inskdCd:'', calngPcNm:'ItgrcMstPrntPC', calngOpratNm:'getGnltInsbnfReqdoc', inputInfo:StringINDTO, prntInfo:StringINDTO, jobKeyInfo:'stringValue', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991105'] = {formCd:'CO991105', formNm:'실손의료비접수대행서비스신청서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991245'] = {formCd:'CO991245', formNm:'실손의료보험금 공동연대책임신청서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991265'] = {formCd:'CO991265', formNm:'위임 및 동의서(1종)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991266'] = {formCd:'CO991266', formNm:'위임 및 동의서(4종)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991269'] = {formCd:'CO991269', formNm:'피보험자 유족확인서', hmgdCfcd:'', inskdCd:'', calngPcNm:'GnltDcibnInfoPrntPC', calngOpratNm:'getInsdpsSvfmlCnfshtInfo', inputInfo:ClaimInfoCDTO, prntInfo:InsdpsSvfmlCnfshtDTO, jobKeyInfo:'rcvNo|hmgdCfcd|dsrnk|plrnk|clcfCd', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991279'] = {formCd:'CO991279', formNm:'교통사고처리지원금_위임장', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991278'] = {formCd:'CO991278', formNm:'교통사고처리지원금_합의서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991300'] = {formCd:'CO991300', formNm:'의료판정(동시감정) 안내 및 동의서', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};
        // this.docList['CO991281'] = {formCd:'CO991281', formNm:'합의서(장기배상)', hmgdCfcd:'', inskdCd:'', calngPcNm:'', calngOpratNm:'', inputInfo:, prntInfo:, jobKeyInfo:'', divNm:'divCo', jobCfcd:'1', filter1:'04', filter2:'04'};

        //TEMPLATE
        //this.docList[''] = {formCd : '', formNm : '', hmgdCfcd : '', inskdCd :'', calngPcNm : '', calngOpratNm : '', inputInfo : '', prntInfo : '', jobKeyInfo : '', divNm : '', jobCfcd : '', filter : '', filter2 : ''};
        //filter2 == '' << 공통, filter2 == '01' << 대인, filter2 == '02' << 대물


        if (this.globalContext.rcvNo && this.globalContext.rcvNo != '' && this.globalContext.rcvNo.length > 13) {
            this.rcvNo = this.globalContext.rcvNo;
        }
        if (this.navParams.data.rcvNo && this.navParams.data.rcvNo != '') {
            this.paramFlag = true;
            this.rcvNo = this.navParams.data.rcvNo;
            this.globalContext.rcvNo = this.navParams.data.rcvNo;
            this.formCd = this.navParams.data.docType;
            if (this.formCd == 'CO991046') {
                this.sendTab = 'partner';
            }
        }

        if (this.rcvNo) {
            this.onRcvNo();
        }
    }

    srchOptionArea: boolean = false;
    srchOption: string = '';
    onSrchOptionArea(cd: string) {
        this.srchOption = this.srchOption + cd;
        if (this.srchOption.indexOf('open') != -1 && this.srchOption.indexOf('close') != -1) { // 두번다 탄경우
            this.srchOptionArea = true;
            this.srchOption = '';
        } else if (this.srchOption.indexOf('open') == -1 && this.srchOption.indexOf('close') != -1) { // close만 탄경우
            this.srchOptionArea = false;
            this.srchOption = '';
        }
    }
    //검색방법 선택 Layer호출
    srchMthdChoc() {
        let params = {};
        this.dialogService.showModalDialog(MCO01_CO_01004L, params).then(result => {
            this.logger.debug("Layer Result::::::::::::::::::" + JSON.stringify(result));
            if (result.rcvNo) {
                this.rcvNo = result.rcvNo;
                this.onRcvNo();
            }
        });
    }

    /**
     * 조회
     */
    onRcvNo() {
        let str = this.rcvNo;
        let ret = str.replace(/-/g, "").replace(/ /g, "");
        ret = ret.toUpperCase();
        let len = ret.length;

        if (len > 4) {
            let year = ret.substring(0, 4);
            let seq = ret.substring(4);

            //숫자이며 2010 ~ 2999  데이터는 무조건 "0"을 채움
            //2010-04-14 수정사항(2010 ~ 2499  데이터는 무조건 "0"을 채움)
            if (isNaN(Number(year.substring(0, 1))) == false && isNaN(Number(year.substring(1, 2))) == false && isNaN(Number(year.substring(2, 3))) == false && isNaN(Number(year.substring(3, 4))) == false && year > "2009" && year < "2500") {
                ret = year + this.fillZero(seq, 10);
            }
            else if (year.substring(0, 2) == "SD" && isNaN(Number(year.substring(2, 3))) == false && isNaN(Number(year.substring(3, 4))) == false) {
                ret = year + this.fillZero(seq, 10);
            }
            else {
                if (len == 9 || len == 10 || len == 11 || len == 12) { }
                else ret = year + this.fillZero(seq, 10);
            }
        }

        this.rcvNo = ret;
        let dto: RcvNoInqCDTO = new RcvNoInqCDTO();
        dto.rcvNo = this.rcvNo;
        this.resetData(dto.rcvNo);
        this.http.sendXml<RcvNoInqCDTO, RcvNoInqPDTO>(dto, 'APP_CO', 'ItgrcNoInqPC', 'getListRcvNo', 'MCO01_WS_01001T', RcvNoInqPDTO)
            .subscribe(result => {
                this.logger.debug(result);

                if ('MIFI0005' == result.proframeHeader.pfmResponseCode) {
                    //값이없으면
                    this.resetData('');
                    this.dialogService.alert('접수번호가 잘못 입력되었습니다.');
                    return;
                } else {
                    var rcvNoInqDTO = Array.isArray(result.body.rcvNoInqDTO) ? result.body.rcvNoInqDTO : [result.body.rcvNoInqDTO];
                    if (0 == rcvNoInqDTO[0].rcvNo.length) {
                        this.resetData('');
                        this.dialogService.alert('접수번호가 잘못 입력되었습니다.');
                        return;
                    } else {
                        this.rcvNoResult = this.rcvNo;
                        this.globalContext.rcvNo = this.rcvNoResult;
                        this.searchDsrnkList();
                    }
                }
            }
            );
    }

    /**
     * 재해서열 조회(접수번호에 속해있는)
     */
    searchDsrnkList() {
        if (this.rcvNo.trim() == '') {
            this.resetData('');
            this.dialogService.alert('접수번호가 없습니다.');
        } else if (this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
        } else {
            let dto: CoInqCDTO = new CoInqCDTO();
            //실행을 위한 dto  설정           
            dto.rcvNo = this.rcvNo.replace('-', '');
            //dto.hmgdCfcd = '02';
            this.http.sendXml<CoInqCDTO, CoInqPCDTO>(dto, 'APP_CO', 'CoKeyInqPC', 'getListDsrnk', 'MCO01_WS_01001T', CoInqPCDTO, { ignoreError: true })
                .subscribe(result => {
                    this.logger.debug(result);
                    if ('MIFI0001' == result.proframeHeader.pfmResponseCode) {
                        this.dsrnkList = Array.isArray(result.body.coInqCDTO) ? result.body.coInqCDTO : [result.body.coInqCDTO];

                        //this.hmgdCfcd = this.dsrnkList[0].hmgdCfcd;
                        //this.dsrnk = this.dsrnkList[0].dsrnk;
                        //this.clcfCd =  this.dsrnkList[0].clcfCd;
                        let selectedIndex = 0;
                        if (this.dsrnkList.length > 1) {
                            for (let i = 0; i < this.dsrnkList.length; i++) {
                                if (this.empType == '01' && this.dsrnkList[i].hmgdCfcd == '01') {//인서열
                                    selectedIndex = i;
                                    break;
                                } else if (this.empType == '02' && this.dsrnkList[i].hmgdCfcd == '02') {//물서열
                                    selectedIndex = i;
                                    break;
                                }
                            }
                        }

                        this.hmgdCfcd = this.paramFlag && this.navParams.data.hmgdCfcd ? this.navParams.data.hmgdCfcd : this.dsrnkList[selectedIndex].hmgdCfcd;
                        this.dsrnk = this.paramFlag && this.navParams.data.dsrnk ? this.navParams.data.dsrnk : this.dsrnkList[selectedIndex].dsrnk;
                        this.clcfCd = this.paramFlag && this.navParams.data.clcfCd ? this.navParams.data.clcfCd : this.dsrnkList[selectedIndex].clcfCd;

                        this.selectedDsrnk = this.hmgdCfcd + '' + this.dsrnk;
                        this.searchPlrnkList();
                    }
                }
                );
        }
    }

    /**
     * 증권서열 조회
     */
    searchPlrnkList() {
        if (this.rcvNo.trim() == '') {
            this.resetData('');
            this.dialogService.alert('접수번호가 없습니다.');
            return;
        }
        if (this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
            return;
        }
        let dto: CoInqCDTO = new CoInqCDTO();
        dto.rcvNo = this.rcvNo.replace('-', '');
        dto.hmgdCfcd = this.hmgdCfcd;
        dto.dsrnk = this.dsrnk;

        this.http.sendXml<CoInqCDTO, CoInqPCDTO>(dto, 'APP_CO', 'CoKeyInqPC', 'getListPlcyNo', 'MCO01_WS_01001T', CoInqPCDTO, { ignoreError: true })
            .subscribe(result => {
                this.logger.debug(result);
                if ('MIFI0001' == result.proframeHeader.pfmResponseCode) {
                    //this.plrnk = Array.isArray(result.body.coInqCDTO) ? result.body.coInqCDTO[0].plrnk : [result.body.coInqCDTO][0].plrnk;
                    this.plrnk = this.paramFlag && this.navParams.data.plrnk ? this.navParams.data.plrnk : Array.isArray(result.body.coInqCDTO) ? result.body.coInqCDTO[0].plrnk : [result.body.coInqCDTO][0].plrnk;
                    this.searchClcfCdList();
                } else if ('MIFI0005' == result.proframeHeader.pfmResponseCode) {
                    //this.serachChtmsList()   
                }
            }
            );
    }

    /**
     * 보상구분조회
     */
    searchClcfCdList() {
        if (this.rcvNo.trim() == '') {
            this.resetData('');
            this.dialogService.alert('접수번호가 없습니다.');
            return;
        }
        if (this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
            return;
        }
        let dto: CoInqCDTO = new CoInqCDTO();
        dto.rcvNo = this.rcvNo.replace('-', '');
        dto.hmgdCfcd = this.hmgdCfcd;
        dto.dsrnk = this.dsrnk;
        dto.plrnk = this.plrnk;

        this.http.sendXml<CoInqCDTO, CoInqPCDTO>(dto, 'APP_CO', 'CoKeyInqPC', 'getListClcfCd', 'MCO01_WS_01001T', CoInqPCDTO, { ignoreError: true })
            .subscribe(result => {
                this.logger.debug(result);
                if ('MIFI0001' == result.proframeHeader.pfmResponseCode) {
                    this.clcfList = Array.isArray(result.body.coInqCDTO) ? result.body.coInqCDTO : [result.body.coInqCDTO];

                    //this.clcfCd = this.clcfList[0].clcfCd; 
                    this.clcfCd = this.paramFlag && this.navParams.data.clcfCd ? this.navParams.data.clcfCd : this.clcfList[0].clcfCd;

                    this.selectedClcf = this.clcfCd;
                    this.iptBoolean = true;
                    this.paramFlag = false;

                    //this.serachChtmsList();
                } else if ('MIFI0005' == result.proframeHeader.pfmResponseCode) {
                    //this.serachChtmsList();
                }
            }
            );
    }

    /**
     * 재해서열 변경
     */
    chngDsrnk() {
        if (this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
            return;
        }
        this.logger.debug(">>>>>>>> chngDsrnk");
        this.hmgdCfcd = this.selectedDsrnk.substr(0, 2);
        this.dsrnk = this.selectedDsrnk.substr(2, 3);
        this.searchPlrnkList();
    }

    /**
     * 보상 변경
     */
    chngClcf() {
        if (this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
            return;
        }
        this.logger.debug(">>>>>>>> changeClcf");
        this.clcfCd = this.selectedClcf;
        this.iptBoolean = true;
    }

    /**
     * 추가서류 POP-UP 오픈
     */
    more() {
        if (!this.validationFormCd()) {
            return;
        }
        let params = { formCd: this.formCd, docList: this.docList };
        this.dialogService.showModalDialog(MCO01_CO_01019L, params).then(result => {
            this.logger.debug(result);
            if (typeof result == 'string') {
                this.formCd = result;
                if (this.formCd == 'CO991046') {
                    this.sendTab = 'partner';
                }
                if ('CO991046' != result &&
                    'CO991026' != result &&
                    'CO991027' != result &&
                    'CO991159' != result &&
                    this.empType == '01'
                ) {
                    //대인
                    this.formText = this.docList[this.formCd].formNm;
                    this.sendTab = 'custom';
                } else if (
                    'CO991045' != result &&
                    'CO991074' != result &&
                    'CO991026' != result &&
                    'CO991159' != result &&
                    this.empType == '02'
                ) {
                    //대물
                    this.formText = this.docList[this.formCd].formNm;
                } else {
                    this.formText = '추가서류';
                    this.setFormCd(this.formCd);
                }
            }
        });
    }

    /**
     * 정비업체조회(파트너 조회) Layer 호출
     */
    ptnSrch() {
        let params = { cmpny: '', name: this.rpairCmpny };
        this.dialogService.showModalDialog(MCO01_CO_01005L, params).then(result => {
            this.logger.debug(result);
            if (result.ptnGnrNm) {
                this.rpairCmpny = result.ptnGnrNm;
                this.rpairCmpnyCd = result.ptnCd;
                this.partnerTelAreaNo = result.faxAreaNo;     //팩스지역번호
                this.partnerTelExchNo = result.faxExchNo;     //팩스국번호
                this.partnerTelSeq = result.faxSeq;        //팩스일련번호
                this.selectedPartnerFax = this.partnerTelAreaNo;
            }
        });
    }

    /**
     * 발송버튼 클릭
     */
    send() {
        if ('' == this.formCd) {
            this.dialogService.alert('서식을 선택 하십시오.');
            return;
        }

        if (this.docList[this.formCd] == undefined) {
            this.dialogService.alert('출력 할 수 없는 문서입니다.');
            return;
        }
        //var keys = this.docList[this.formCd].jobKeyInfo.split('|');
        if (this.docList[this.formCd].jobKeyInfo.indexOf('rcvNo') > -1 && '' == this.rcvNo.trim()) {
            this.dialogService.alert('접수번호가 잘못 입력되었습니다.');
            return;
        }
        if (this.docList[this.formCd].jobKeyInfo.indexOf('rcvNo') > -1 && this.rcvNo != this.rcvNoResult) {
            this.dialogService.alert('접수번호가 변경되었습니다.');
            return;
        }
        if (this.docList[this.formCd].jobKeyInfo.indexOf('dsrnk') > -1 && '' == this.selectedDsrnk) {
            this.dialogService.alert('재해서열을 선택 하십시오.');
            return;
        }
        if (this.docList[this.formCd].jobKeyInfo.indexOf('clcf') > -1 && '' == this.selectedClcf) {
            this.dialogService.alert('부상구분이 선택 하십시오.');
            return;
        }
        if ('custom' == this.sendTab) {
            if ('' == this.customSendType) {
                this.dialogService.alert('발송방법을 선택 하십시오.');
                return;
            }
            if ('fax' == this.customSendType) {
                if (this.customTelExchNo.length < 3) {
                    this.dialogService.alert('팩스 번호를 입력하십시오.');
                    return;
                }
                if (this.customTelSeq.length < 4) {
                    this.dialogService.alert('팩스 번호를 입력하십시오.');
                    return;
                }
            }
            if ('email' == this.customSendType) {
                if ('' == this.customEmailId) {
                    this.dialogService.alert('이메일 주소를 입력하십시오.');
                    return;
                }
                if ('' == this.customEmailDomainNm) {
                    this.dialogService.alert('이메일 주소를 입력하십시오.');
                    return;
                }
            }
        } else if ('partner' == this.sendTab) {
            if ('' == this.partnerSendType) {
                this.dialogService.alert('발송방법을 선택 하십시오.');
                return;
            }
            if ('fax' == this.partnerSendType) {
                if (this.partnerTelExchNo.length < 3) {
                    this.dialogService.alert('팩스 번호를 입력하십시오.');
                    return;
                }
                if (this.partnerTelSeq.length < 4) {
                    this.dialogService.alert('팩스 번호를 입력하십시오.');
                    return;
                }
            }
            if ('email' == this.partnerSendType) {
                if ('' == this.partnerEmailId) {
                    this.dialogService.alert('이메일 주소를 입력하십시오.');
                    return;
                }
                if ('' == this.partnerEmailDomainNm) {
                    this.dialogService.alert('이메일 주소를 입력하십시오.');
                    return;
                }
            }
        }

        if (this.docList[this.formCd] == undefined) {
            this.dialogService.alert('정의되지 않은 문서입니다.');
            return;
        } else {
            let calngPcNm = this.docList[this.formCd].calngPcNm;
            let calngOpratNm = this.docList[this.formCd].calngOpratNm;
            let inputInfo = this.docList[this.formCd].inputInfo;
            let prntInfo = this.docList[this.formCd].prntInfo;
            let jobKeyInfo = this.docList[this.formCd].jobKeyInfo;
            let jobCfcd = this.docList[this.formCd].jobCfcd;
            let divNm = this.docList[this.formCd].divNm;
            if ('' == calngPcNm.trim()) {
                this.xmlData = '';
                this.send_form_info();
            } else {
                //var dto = new ClfePaymtGrnoteCDTO();
                var dto = new this.docList[this.formCd].inputInfo();
                var keys = this.docList[this.formCd].jobKeyInfo.split('|');
                for (let key in keys) {
                    dto[keys[key]] = this[keys[key]];
                    if (keys[key] == 'stringValue') {
                        dto[keys[key]] = this.rcvNo;
                    }
                }

                this.http.sendXml<any, any>(dto, 'APP_CO', calngPcNm, calngOpratNm, 'MCO01_WS_01001T', this.docList[this.formCd].prntInfo, { ignoreError: true })
                    .subscribe(result => {
                        this.logger.debug(result);
                        if ('I' == result.proframeHeader.pfmResponseType) {
                            this.xmlData = result.body;
                            this.send_form_info();
                        } else {
                            this.dialogService.alert(result.proframeHeader.pfmResponseCode + ", " + result.proframeHeader.pfmResponseBasc);
                        }
                    }
                    );
            }
        }
    }

    send_form_info() {
        //자동차진료비지불보증서
        if (this.formCd == 'CO991046') {
            //FAX발송, 심평원전문발송
            if (this.customSendType == 'fax' || this.partnerSendType == 'fax') {
                this.send_fax_telmsg_form_info_CO991046();
            } else {
                this.send_form_info_CO991046();
            }
        }
        //출력 / FAX / Email
        else {
            this.docSend(null);
        }
    }

    objectToString(obj, name) {

        let str = '';
        let dataKeys = Object.keys(obj);
        let objArr = [];
        let datasetName = obj.constructor.name;
        if (name != undefined && name != '') {
            datasetName = name;
        }
        if (typeof obj == 'object') {
            if (name != 'Array') {
                str += '<DATASET name="' + datasetName + '">';
                str += '<' + datasetName + '>';
            }
            for (let key in dataKeys) {
                if (typeof obj[dataKeys[key]] == 'string') {
                    if ('' != obj[dataKeys[key]]) {
                        str += '<' + dataKeys[key] + '>' + obj[dataKeys[key]] + '</' + dataKeys[key] + '>';
                        //str += '<'+dataKeys[key]+'>' + encodeURIComponent(obj[dataKeys[key]])+'</'+dataKeys[key]+'>';
                    } else {
                        str += '<' + dataKeys[key] + '/>';
                    }

                }
                if (typeof obj[dataKeys[key]] == 'object') {
                    let name = dataKeys[key];
                    objArr[name] = obj[dataKeys[key]];
                    //encodeURIComponent(param)
                }
            }
            if (name != 'Array') {
                str += '</' + datasetName + '>';
                str += '</DATASET>';
            }

            for (let data in objArr) {
                if (Array.isArray(objArr[data])) {
                    str += '<DATASET name="' + data + '">';
                    for (let d in objArr[data]) {
                        str += '<' + data + '>';
                        str += this.objectToString(objArr[data][d], "Array");
                        str += '</' + data + '>';
                    }
                    str += '</DATASET>';
                } else {
                    str += this.objectToString(objArr[data], data);
                }
            }
        }
        return str;
    }

    docSend(param) {
        let dto = new ClaimDocMngtInfoCDTO();

        if ('' == this.xmlData) {
            let str1 = '<?xml version="1.0" encoding="utf-8"?>';
            str1 += '<DATASETLIST/>';
            dto.sendTelmsgText = str1;
        } else {
            let str2 = '';
            str2 += '<?xml version="1.0" encoding="utf-8"?>';
            str2 += '<DATASETLIST>';
            str2 += this.objectToString(this.xmlData, '');
            str2 += '</DATASETLIST>';
            dto.sendTelmsgText = str2;
        }

        dto.sendTelmsgText = encodeURIComponent(dto.sendTelmsgText.replace(/</g, '&lt;').replace(/>/g, '&gt;'));//.replace(/\s/g, '&#32;').replace(/"/g, '&quot;').replace(/\r/g,'&#13;').replace(/\n/g,'&#10;');

        if (this.sendTab == 'custom' && this.customSendType == 'fax') {
            dto.sendCfcd = '04';
            //selectedCustomFax: string = '02';
            dto.faxAreaNo = this.selectedCustomFax;
            //dto.faxAreaNo = this.customTelAreaNo;
            dto.faxExchNo = this.customTelExchNo;
            dto.faxSeq = this.customTelSeq;
        } else if (this.sendTab == 'partner' && this.partnerSendType == 'fax') {
            dto.sendCfcd = '04';
            //partnerTelAreaNo: string = '';
            dto.faxAreaNo = this.selectedPartnerFax;
            dto.faxExchNo = this.partnerTelExchNo;
            dto.faxSeq = this.partnerTelSeq;
        } else if (this.sendTab == 'custom' && this.customSendType == 'email') {
            dto.sendCfcd = '03';
            dto.emailId = this.customEmailId;
            dto.emailDomainNm = this.customEmailDomainNm;
        } else if (this.sendTab == 'partner' && this.partnerSendType == 'email') {
            dto.sendCfcd = '03';
            dto.emailId = this.partnerEmailId;
            dto.emailDomainNm = this.partnerEmailDomainNm;
        }
        var keys = this.docList[this.formCd].jobKeyInfo.split('|');
        if (this.docList[this.formCd].jobKeyInfo.trim() != '') {
            for (var i = 0; i < keys.length; i++) {
                dto['jobKeyInfo' + (i + 1)] = this[keys[i]];
            }
        }

        //자동차진료비지불보증서
        if (this.formCd == 'CO991046') {
            if (param.body.carClncSvcfeePyGurMngtInfoDTO != undefined) {
                dto.jobKeyInfo6 = param.body.carClncSvcfeePyGurMngtInfoDTO.pyGurDgre;
                dto.jobKeyInfo7 = param.body.carClncSvcfeePyGurMngtInfoDTO.chtms;
                dto.jobKeyInfo8 = param.body.carClncSvcfeePyGurMngtInfoDTO.carPyGurNo;
            } else if (param.body.constructor.name == 'CarClncSvcfeePyGurMngtInfoDTO') {
                dto.jobKeyInfo6 = param.body.pyGurDgre;
                dto.jobKeyInfo7 = param.body.chtms;
                dto.jobKeyInfo8 = param.body.carPyGurNo;
            }
        }

        dto.formCd = this.docList[this.formCd].formCd;
        dto.formNm = this.docList[this.formCd].formNm;

        this.http.sendXml<any, any>(dto, 'APP_CO', "PrntppMngtPC", "regstClaimDocSendClaimHist", 'MCO01_WS_01001T', ClaimDocMngtInfoCDTO, { ignoreError: true })
            .subscribe(result => {
                this.logger.debug(result);
                if ('I' == result.proframeHeader.pfmResponseType) {
                    //this.docSend(result);
                    this.dialogService.alert('발송되었습니다.');
                } else {
                    this.dialogService.alert(result.proframeHeader.pfmResponseCode + ", " + result.proframeHeader.pfmResponseBasc);
                }
            }
            );
    }

    //자동차진료비지불보증서 '팩스&전문' 발송
    send_fax_telmsg_form_info_CO991046() {
        let hiraPyGurDTO: HiraPyGurDTO = new HiraPyGurDTO();
        let inGurDto = hiraPyGurDTO.hiraPyGurResDTO;
        let inMngtDto = hiraPyGurDTO.carClncSvcfeePyGurMngtInfoDTO;
        let outdto = hiraPyGurDTO.carClncSvcfeePyGurMngtInfoDTO;

        inGurDto.apvlCfcd = '0';
        inGurDto.gurReqTpcd = '1';
        inMngtDto.rcvNo = this.rcvNo;
        inMngtDto.hmgdCfcd = this.hmgdCfcd;
        inMngtDto.dsrnk = this.dsrnk;
        inMngtDto.plrnk = this.plrnk;
        inMngtDto.clcfCd = this.clcfCd;
        inMngtDto.pyGurSttcd = '01'
        if (this.sendTab == 'partner') {
            inMngtDto.ptnCd = this.rpairCmpnyCd;
            inMngtDto.ptnNm = this.rpairCmpny;
            inMngtDto.ptnTelAreaNo = this.selectedPartnerFax;
            inMngtDto.ptnTelExchNo = this.partnerTelExchNo;
            inMngtDto.ptnTelSeq = this.partnerTelSeq;
        } else {
            inMngtDto.ptnTelAreaNo = this.selectedCustomFax;
            inMngtDto.ptnTelExchNo = this.customTelExchNo;
            inMngtDto.ptnTelSeq = this.customTelSeq;
        }
        inMngtDto.pyGurIsuDate = DateUtil.getCurrentDateWithFormat("yyyy-MM-dd");
        inMngtDto.regstrPtcd = this.globalContext.user.pfmBrchofCd;
        inMngtDto.regstrTmcd = this.globalContext.user.pfmDpcd;
        inMngtDto.regstrCtcd = this.globalContext.user.pfmHdqrtCd;

        hiraPyGurDTO.hiraPyGurResDTO = inGurDto;
        hiraPyGurDTO.carClncSvcfeePyGurMngtInfoDTO = inMngtDto;

        this.http.sendXml<any, any>(hiraPyGurDTO, 'APP_CO', "CarClncSvcfeePyGurMngtInfoPC", "hiraPyGurTrans", 'MCO01_WS_01001T', HiraPyGurDTO, { ignoreError: true })
            .subscribe(result => {

                if ('I' == result.proframeHeader.pfmResponseType) {
                    this.docSend(result);
                } else {
                    this.dialogService.alert(result.proframeHeader.pfmResponseCode + ", " + result.proframeHeader.pfmResponseBasc);
                }
            }
            );
    }

    //자동차진료비지불보증서 발송
    send_form_info_CO991046() {
        let carClncSvcfeePyGurMngtInfoDTO: CarClncSvcfeePyGurMngtInfoDTO = new CarClncSvcfeePyGurMngtInfoDTO();

        carClncSvcfeePyGurMngtInfoDTO.rcvNo = this.rcvNo;
        carClncSvcfeePyGurMngtInfoDTO.hmgdCfcd = this.hmgdCfcd;
        carClncSvcfeePyGurMngtInfoDTO.dsrnk = this.dsrnk;
        carClncSvcfeePyGurMngtInfoDTO.plrnk = this.plrnk;
        carClncSvcfeePyGurMngtInfoDTO.clcfCd = this.clcfCd;
        carClncSvcfeePyGurMngtInfoDTO.pyGurSttcd = '01';
        if (this.sendTab == 'partner') {
            carClncSvcfeePyGurMngtInfoDTO.ptnCd = this.rpairCmpnyCd;
            carClncSvcfeePyGurMngtInfoDTO.ptnNm = this.rpairCmpny;
            carClncSvcfeePyGurMngtInfoDTO.ptnTelAreaNo = this.selectedPartnerFax;
            carClncSvcfeePyGurMngtInfoDTO.ptnTelExchNo = this.partnerTelExchNo;
            carClncSvcfeePyGurMngtInfoDTO.ptnTelSeq = this.partnerTelSeq;
        } else {
            carClncSvcfeePyGurMngtInfoDTO.ptnTelAreaNo = this.selectedCustomFax;
            carClncSvcfeePyGurMngtInfoDTO.ptnTelExchNo = this.customTelExchNo;
            carClncSvcfeePyGurMngtInfoDTO.ptnTelSeq = this.customTelSeq;
        }
        carClncSvcfeePyGurMngtInfoDTO.pyGurIsuDate = DateUtil.getCurrentDateWithFormat("yyyy-MM-dd");
        carClncSvcfeePyGurMngtInfoDTO.unqMater = '';
        carClncSvcfeePyGurMngtInfoDTO.regstrEmpNo = this.globalContext.user.pfmEmpNo;
        carClncSvcfeePyGurMngtInfoDTO.regstrPtcd = this.globalContext.user.pfmBrchofCd;
        carClncSvcfeePyGurMngtInfoDTO.regstrTmcd = this.globalContext.user.pfmDpcd;
        carClncSvcfeePyGurMngtInfoDTO.regstrCtcd = this.globalContext.user.pfmHdqrtCd;

        this.http.sendXml<any, any>(carClncSvcfeePyGurMngtInfoDTO, 'APP_CO', "CarClncSvcfeePyGurMngtInfoPC", "addCarClncSvcfeePyGurInfo", 'MCO01_WS_01001T', CarClncSvcfeePyGurMngtInfoDTO, { ignoreError: true })
            .subscribe(result => {
                this.logger.debug(result);
                if ('I' == result.proframeHeader.pfmResponseType) {
                    this.docSend(result);
                } else {
                    this.dialogService.alert(result.proframeHeader.pfmResponseCode + ", " + result.proframeHeader.pfmResponseBasc);
                }
            }
            );
    }

    setFormCd(param) {
        if (this.validationFormCd()) {
            this.formCd = param;
            this.formText = '추가서류';
            if (param == 'CO991046') {
                this.sendTab = 'partner';
            } else if (this.empType == '01') {
                this.sendTab = 'custom';
            }
        }
    }

    validationFormCd(): boolean {
        if (this.selectedClcf != '' && this.rcvNoResult != '' && this.rcvNo == this.rcvNoResult) {
            this.iptBoolean = true;
            return true;
        } else {
            this.dialogService.alert('접수번호, 서열, 보상구분이 입력되어야 합니다.');
            this.iptBoolean = false;
            return false;
        }
    }


    // type --->
    // CUST_NM : 성명,
    // IDNO : 주민등록번호/여권번호, 
    // TELNO:전화/팩스/핸드폰, 
    // VCNO:차량번호/차대번호,
    // EMAIL : 메일 , 
    // ADDR :주소
    asMaskedCladMskngAppl(type: string, value: string): string {
        return this.commonService.asMaskedCladMskngAppl(type, value);
    }

    fillZero(str, len) {
        var offset;
        var i;
        var temp_str = str + "";
        temp_str = temp_str.trim();
        if (isNaN(Number(temp_str))) {
            return str;
        }
        if (temp_str.length >= len) return temp_str;
        offset = len - temp_str.length;
        while (offset > 0) {
            switch (offset) {
                case 1: offset = 0; temp_str = "0" + temp_str; break;
                case 2: offset = 0; temp_str = "00" + temp_str; break;
                case 3: offset = 0; temp_str = "000" + temp_str; break;
                case 4: offset = 0; temp_str = "0000" + temp_str; break;
                case 5: offset = 0; temp_str = "00000" + temp_str; break;
                case 6: offset = 0; temp_str = "000000" + temp_str; break;
                case 7: offset = 0; temp_str = "0000000" + temp_str; break;
                case 8: offset = 0; temp_str = "00000000" + temp_str; break;
                case 9: offset = 0; temp_str = "000000000" + temp_str; break;
                case 10: offset = 0; temp_str = "0000000000" + temp_str; break;
                case 11: offset = 0; temp_str = "00000000000" + temp_str; break;
                case 12: offset = 0; temp_str = "000000000000" + temp_str; break;
                case 13: offset = 0; temp_str = "0000000000000" + temp_str; break;
                case 14: offset = 0; temp_str = "00000000000000" + temp_str; break;
                case 15: offset = 0; temp_str = "000000000000000" + temp_str; break;
                default: offset -= 15; temp_str = "000000000000000" + temp_str; break;
            }
        }
        return temp_str;
    }
}